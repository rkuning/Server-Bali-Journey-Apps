const { temp_image, package_trip, payment, cart_item, user } = require("../../models");
const midtransClient = require("midtrans-client");

let core = new midtransClient.CoreApi({
  isProduction: false,
  clientKey: "SB-Mid-client-gG4rRBlMKhh5uKXA",
  serverKey: "SB-Mid-server-wLlwnHDP89wC2KHUgoc5mdGT",
});

class UserPaymentController {
  static async getCarts(req, res) {
    try {
      const userId = req.user.id;
      const result = [];
      const valPaym = await payment.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { userId, status: "oncart" },
      });
      if (valPaym) {
        const dataCarts = await cart_item.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"] },
          where: { paymentId: valPaym.id },
        });
        for (let i in dataCarts) {
          const package_tripId = dataCarts[i].package_tripId;
          const dataPack = await package_trip.findOne({ where: { id: package_tripId } });
          const images = await temp_image.findAll({
            attributes: ["id", "package_tripId", "img"],
            where: { package_tripId },
          });
          result.push({
            ...dataCarts[i].dataValues,
            name: dataPack.name,
            price: dataPack.price,
            rating: dataPack.rating,
            images,
          });
        }
        const hasil = { ...valPaym.dataValues, cart_items: result };
        res.status(200).json(hasil);
      } else {
        res.status(404).json(result);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // fix today

  static async addCarts(req, res) {
    try {
      const userId = req.user.id;
      const { date, package_tripId, amount } = req.body;
      if (amount > 8) {
        res.status(203).json({ msg: "Max member less and equal than 8" });
      } else {
        let varDate = new Date(date);
        let today = new Date();
        let isBooked = false;
        today.setHours(0, 0, 0, 0);
        if (varDate >= today) {
          const valCart = await cart_item.findAll({ where: { date, package_tripId } });
          for (let i in valCart) {
            let paymentId = valCart[i].paymentId;
            const valP = await payment.findOne({ where: { id: paymentId } });
            if (valP.status === "paid") {
              isBooked = true;
              break;
            }
          }
          if (isBooked) {
            res.status(203).json({ msg: "This package trip already booked by someone, choose another date!" });
          } else {
            const valPackage = await package_trip.findOne({ where: { id: package_tripId } });
            if (valPackage) {
              const valPaym = await payment.findOne({ where: { userId, status: "oncart" } });
              const price = +valPackage.price;
              if (valPaym) {
                const valSameData = await cart_item.findOne({ where: { date, package_tripId, paymentId: valPaym.id } });
                if (valSameData) {
                  const newAmount = +valSameData.amount + +amount;
                  if (newAmount > 8) {
                    res.status(203).json({ msg: "Max member has reach out!" });
                  } else {
                    await cart_item.update({ amount: newAmount }, { where: { id: valSameData.id } });
                    const result = await cart_item.findOne({ where: { id: valSameData.id } });
                    let balance = 0;
                    const dataTotal = await cart_item.findAll({ where: { paymentId: +valPaym.id } });
                    for (let i in dataTotal) {
                      const id = +dataTotal[i].package_tripId;
                      const { price } = await package_trip.findOne({ where: { id } });
                      let jumlah = price * +dataTotal[i].amount;
                      balance += jumlah;
                    }
                    await payment.update({ total: balance }, { where: { id: valPaym.id } });
                    res.status(201).json(result);
                  }
                } else {
                  const addCart = await cart_item.create({ paymentId: valPaym.id, date, package_tripId, amount });
                  let balance = 0;
                  const dataTotal = await cart_item.findAll({ where: { paymentId: valPaym.id } });
                  for (let i in dataTotal) {
                    const id = dataTotal[i].package_tripId;
                    const { price } = await package_trip.findOne({ where: { id } });
                    let jumlah = price * dataTotal[i].amount;
                    balance += jumlah;
                  }
                  await payment.update({ total: balance }, { where: { id: valPaym.id } });
                  res.status(201).json(addCart);
                }
              } else {
                const newPay = await payment.create({ userId, status: "oncart" });
                const paymentId = newPay.id;
                const addCart = await cart_item.create({ paymentId, date, package_tripId, amount });
                const total = price * +addCart.amount;
                await payment.update({ total }, { where: { id: newPay.id } });
                res.status(201).json(addCart);
              }
            } else {
              res.status(404).json({ msg: "Package trip not found!" });
            }
          }
        } else {
          res.status(203).json({ msg: "Date is not valid!" });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addPayments(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.body;
      const payment_code = (Math.random() + 1).toString(36).substring(2).toUpperCase();
      const valPaym = await payment.findOne({ where: { userId, status: "oncart" } });
      if (valPaym) {
        const validasiCart = await cart_item.findAll({ where: { id, paymentId: valPaym.id } });
        let isValidDate = true;
        let today = new Date();
        for (let j in validasiCart) {
          const { date } = validasiCart[j];
          let varDate = new Date(date);
          if (varDate <= today) {
            isValidDate = false;
            break;
          }
        }
        if (isValidDate) {
          const listCarts = await cart_item.findAll({ where: { paymentId: valPaym.id } });
          const arrCarts = [];
          listCarts.forEach((list) => {
            return arrCarts.push(list.id);
          });
          let valCart;
          if (typeof id === "string") {
            valCart = arrCarts.includes(parseInt(id));
          } else {
            for (let i = 0; i < id.length; i++) {
              valCart = arrCarts.includes(parseInt(id[i]));
              if (valCart) {
                valCart = true;
              } else {
                valCart = false;
                break;
              }
            }
          }
          if (valCart) {
            const newPayment = await payment.create({ userId, payment_code, status: "unpaid" });
            await cart_item.update({ paymentId: newPayment.id }, { where: { id } });
            let balance = 0;
            const dataTotal = await cart_item.findAll({ where: { paymentId: valPaym.id } });
            for (let i in dataTotal) {
              const id = dataTotal[i].package_tripId;
              const { price } = await package_trip.findOne({ where: { id } });
              let jumlah = price * dataTotal[i].amount;
              balance += jumlah;
            }
            await payment.update({ total: balance }, { where: { id: valPaym.id } });
            let totalUnpaid = 0;
            const dataTotalUnpaid = await cart_item.findAll({ where: { paymentId: newPayment.id } });
            for (let i in dataTotalUnpaid) {
              const id = dataTotalUnpaid[i].package_tripId;
              const { price } = await package_trip.findOne({ where: { id } });
              let jumlah = price * dataTotalUnpaid[i].amount;
              totalUnpaid += jumlah;
            }
            await payment.update({ total: totalUnpaid }, { where: { id: newPayment.id } });
            const dataCarts = await cart_item.findAll({ where: { paymentId: newPayment.id } });
            res.json(dataCarts);
          } else {
            res.status(404).json({ msg: "Id cart_item isnt match!" });
          }
        } else {
          res.status(203).json({ msg: "There is an item that invalid date!" });
        }
      } else {
        res.status(404).json({ msg: "Data cart not found!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getUnpaids(req, res) {
    try {
      const userId = req.user.id;
      const result = [];
      const valPaym = await payment.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { userId, status: "unpaid" },
      });
      if (valPaym) {
        for (let a in valPaym) {
          const dataCarts = await cart_item.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { paymentId: valPaym[a].id },
          });
          let temp = [];
          for (let i in dataCarts) {
            const package_tripId = dataCarts[i].package_tripId;
            const dataPack = await package_trip.findOne({ where: { id: package_tripId } });
            const images = await temp_image.findAll({
              attributes: ["id", "package_tripId", "img"],
              where: { package_tripId },
            });
            temp.push({
              ...dataCarts[i].dataValues,
              name: dataPack.name,
              price: dataPack.price,
              rating: dataPack.rating,
              images,
            });
          }
          result.push({ ...valPaym[a].dataValues, cart_items: temp });
        }
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getPaids(req, res) {
    try {
      const userId = req.user.id;
      const result = [];
      const valPaym = await payment.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { userId, status: "paid" },
      });
      if (valPaym) {
        for (let a in valPaym) {
          const dataCarts = await cart_item.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: { paymentId: valPaym[a].id },
          });
          let temp = [];
          for (let i in dataCarts) {
            const package_tripId = dataCarts[i].package_tripId;
            const dataPack = await package_trip.findOne({ where: { id: package_tripId } });
            const images = await temp_image.findAll({
              attributes: ["id", "package_tripId", "img"],
              where: { package_tripId },
            });
            temp.push({
              ...dataCarts[i].dataValues,
              name: dataPack.name,
              price: dataPack.price,
              rating: dataPack.rating,
              images,
            });
          }
          result.push({ ...valPaym[a].dataValues, cart_items: temp });
        }
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deletePayments(req, res) {
    try {
      const id = +req.params.id;
      const userId = req.user.id;
      const result = await payment.destroy({ where: { id, userId, status: "unpaid" } });
      if (result !== 0) {
        res.status(200).json({ message: `Payment with id ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Payment not found!` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteCarts(req, res) {
    try {
      const id = +req.params.id;
      const userId = req.user.id;
      const valCart = await cart_item.findOne({ where: { id } });
      if (valCart) {
        const valPayment = await payment.findOne({ where: { id: valCart.paymentId, userId, status: "oncart" } });
        if (valPayment) {
          await cart_item.destroy({ where: { id } });
          let balance = 0;
          const dataTotal = await cart_item.findAll({ where: { paymentId: +valPayment.id } });
          for (let i in dataTotal) {
            const id = +dataTotal[i].package_tripId;
            const { price } = await package_trip.findOne({ where: { id } });
            let jumlah = price * +dataTotal[i].amount;
            balance += jumlah;
          }
          await payment.update({ total: balance }, { where: { id: valPayment.id } });
          res.status(200).json({ message: `Cart item with id ${id} has been deleted!` });
        } else {
          res.status(404).json({ message: `Data invalid!` });
        }
      } else {
        res.status(404).json({ message: `Cart item not found!` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async successPayments(req, res) {
    try {
      const id = +req.params.id;
      const userId = req.user.id;
      let isBooked = false;
      const cekPayment = await payment.findOne({ where: { id, userId, status: "unpaid" } });
      if (cekPayment) {
        const valPayment = await cart_item.findAll({ where: { paymentId: id } });
        for (let a in valPayment) {
          const { date, package_tripId } = valPayment[a];
          const valCart = await cart_item.findAll({ where: { date, package_tripId } });
          for (let i in valCart) {
            let paymentId = valCart[i].paymentId;
            const valP = await payment.findOne({ where: { id: paymentId } });
            if (valP.status === "paid") {
              isBooked = true;
              break;
            }
          }
        }
        if (isBooked) {
          res.status(203).json({ msg: "This package trip already booked by someone, choose another date!" });
        } else {
          const result = await payment.update({ status: "paid" }, { where: { id, userId, status: "unpaid" } });
          if (result[0] !== 0) {
            res.status(200).json({ message: `Payment successfully!` });
          } else {
            res.status(404).json({ message: `Payment not found!` });
          }
        }
      } else {
        res.status(404).json({ message: `Payment not found!` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async payMidtrans(req, res) {
    try {
      const id = +req.params.id;
      const userId = req.user.id;
      // const { payment_type, gross_amount, bank } = req.body;

      // const payload = {
      //   payment_type,
      //   transaction_details: {
      //     gross_amount: +gross_amount,
      //     order_id,
      //   },
      //   bank_transfer: {
      //     bank,
      //   },
      // };
      const resPayment = await core.charge(req.body);
      const status = resPayment.transaction_status;
      const midtransId = resPayment.order_id;
      const responseMidtrans = JSON.stringify(resPayment);
      const result = await payment.update({ status, midtransId, responseMidtrans }, { where: { id } });
      res.status(200).json(resPayment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserPaymentController;
