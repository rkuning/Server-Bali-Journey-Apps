const { user, temp_image, destination, package_trip, review, tour_package, category } = require("../../models");

class UserDetailController {
  static async detailDest(req, res) {
    try {
      const { id } = req.params;
      const userId = +req.user.id;
      let reviews = [];
      let userReview;
      let dataDestination = await destination.findOne({
        include: [category],
        where: { id },
      });
      if (dataDestination) {
        let images = await temp_image.findAll({
          attributes: ["id", "destinationId", "img"],
          where: { destinationId: dataDestination.id },
        });
        const revDes = await review.findAll({
          attributes: { exclude: ["createdAt", "updatedAt", "package_tripId"] },
          include: [user],
          where: { destinationId: dataDestination.id },
        });
        for (let i in revDes) {
          let reviewId = revDes[i].id;
          let images = await temp_image.findAll({ attributes: ["id", "reviewId", "img"], where: { reviewId } });
          let data = { ...revDes[i].dataValues, images };
          reviews.push(data);
        }

        const userRevDes = await review.findOne({
          attributes: { exclude: ["createdAt", "updatedAt", "package_tripId"] },
          include: [user],
          where: { destinationId: dataDestination.id, userId },
        });
        if (userRevDes) {
          let userReviewId = userRevDes.id;
          let userRevImages = await temp_image.findAll({
            attributes: ["id", "reviewId", "img"],
            where: { reviewId: userReviewId },
          });
          userReview = { ...userRevDes.dataValues, images: userRevImages };
        } else {
          userReview = {};
        }

        let data = { ...dataDestination.dataValues, images, reviews, userReview };
        res.status(200).json(data);
      } else {
        res.status(404).json({ msg: `Not found` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async detailPack(req, res) {
    try {
      let destinations = [];
      const userId = +req.user.id;
      const { id } = req.params;
      let dataPackageTrip = await package_trip.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { id },
      });
      if (dataPackageTrip) {
        let images = await temp_image.findAll({
          attributes: ["id", "package_tripId", "img"],
          where: { package_tripId: dataPackageTrip.id },
        });
        let dataTourPackage = await tour_package.findAll({ where: { package_tripId: dataPackageTrip.id } });
        for (let i in dataTourPackage) {
          let id = dataTourPackage[i].dataValues.destinationId;
          let dataDes = await destination.findAll({
            include: [category],
            where: { id },
          });
          for (let i in dataDes) {
            let destinationId = dataDes[i].id;
            let images = await temp_image.findAll({ attributes: ["id", "destinationId", "img"], where: { destinationId } });
            destinations.push({ ...dataDes[i].dataValues, images });
          }
        }
        let reviews = [];
        const revPack = await review.findAll({
          attributes: { exclude: ["createdAt", "updatedAt", "destinationId"] },
          include: [user],
          where: { package_tripId: dataPackageTrip.id },
        });
        for (let i in revPack) {
          let reviewId = revPack[i].id;
          let images = await temp_image.findAll({ attributes: ["id", "reviewId", "img"], where: { reviewId } });
          let data = { ...revPack[i].dataValues, images };
          reviews.push(data);
        }

        const userRevPack = await review.findOne({
          attributes: { exclude: ["createdAt", "updatedAt", "destinationId"] },
          include: [user],
          where: { package_tripId: dataPackageTrip.id, userId },
        });
        let userReview;
        if (userRevPack) {
          let userReviewId = userRevPack.id;
          let userReviewImages = await temp_image.findAll({
            attributes: ["id", "reviewId", "img"],
            where: { reviewId: userReviewId },
          });
          userReview = { ...userRevPack.dataValues, images: userReviewImages };
        } else {
          userReview = {};
        }

        let data = { ...dataPackageTrip.dataValues, images, destinations, reviews, userReview };
        res.status(200).json(data);
      } else {
        res.status(404).json({ msg: `Not found!` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserDetailController;
