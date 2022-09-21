const { package_trip } = require("../../models");

class PackageTripController {
  static async getPackageTrip(req, res) {
    try {
      let result = await package_trip.findAll();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getPackageTripId(req, res) {
    try {
      const { id } = req.params;
      const result = await package_trip.findOne({ where: { id } });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addPackageTrip(req, res) {
    try {
      const { name, description, price, rating } = req.body;
      let result = await package_trip.create({
        name,
        description,
        price,
        rating,
      });
      res.status(201).json(result);
      // Belum Create Destination nya
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deletePackageTrip(req, res) {
    try {
      const { id } = req.params;
      const result = await package_trip.destroy({ where: { id } });
      if (result !== 0) {
        res
          .status(200)
          .json({ message: `Package Trip with id ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Package Trip can't be deleted` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updatePackageTrip(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, rating } = req.body;
      const result = await package_trip.update(
        { name, description, price, rating },
        { where: { id } }
      );
      if (result[0] !== 0) {
        res
          .status(200)
          .json({ message: `Package Trip with id ${id} has been updated` });
      } else {
        res.status(404).json({ message: `Package Trip can't be updated` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = PackageTripController;
