const { package_trip, temp_image } = require("../../models");

class PackageTripController {
  static async getPackageTrip(req, res) {
    try {
      let result = [];

      let package_trips = await package_trip.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      for (let i in package_trips) {
        let package_tripId = package_trips[i].id;
        let images = await temp_image.findAll({ attributes: ["id", "package_tripId", "img"], where: { package_tripId } });
        let data = { ...package_trips[i].dataValues, images };
        result.push(data);
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getPackageTripId(req, res) {
    try {
      const { id } = req.params;
      let dataPackageTrip = await package_trip.findOne({
        where: { id },
      });
      if (dataPackageTrip) {
        let images = await temp_image.findAll({
          attributes: ["id", "package_tripId", "img"],
          where: { package_tripId: dataPackageTrip.id },
        });
        let data = { ...dataPackageTrip.dataValues, images };
        res.status(200).json(data);
      } else {
        res.status(404).json({ msg: `Not found!` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addPackageTrip(req, res) {
    try {
      const { name, description, price } = req.body;
      const img = req.file.path;
      let result = await package_trip.create({
        name,
        description,
        price,
      });
      await temp_image.create({ package_tripId: result.id, img });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deletePackageTrip(req, res) {
    try {
      const { id } = req.params;
      const result = await package_trip.destroy({ where: { id } });
      if (result !== 0) {
        res.status(200).json({ msg: `Package Trip with id ${id} has been deleted` });
      } else {
        res.status(404).json({ msg: `Package Trip can't be deleted` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updatePackageTrip(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;
      const result = await package_trip.update({ name, description, price }, { where: { id } });
      if (result[0] !== 0) {
        res.status(200).json({ msg: `Package Trip with id ${id} has been updated` });
      } else {
        res.status(404).json({ msg: `Package Trip can't be updated` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = PackageTripController;
