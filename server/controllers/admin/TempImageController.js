const { temp_image } = require("../../models");

class TempImageController {
  static async getTempImage(req, res) {
    try {
      let result = await temp_image.findAll();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getTempImageId(req, res) {
    try {
      const { id } = req.params;
      const result = await temp_image.findOne({ where: { id } });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addTempImage(req, res) {
    try {
      const { userId, destinationId, package_tripId, reviewId, img } = req.body;
      let result = await temp_image.create({
        userId,
        destinationId,
        package_tripId,
        reviewId,
        img,
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteTempImage(req, res) {
    try {
      const { id } = req.params;
      const result = await temp_image.destroy({ where: { id } });
      if (result !== 0) {
        res.status(200).json({ message: `Image with id ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Image can't be deleted` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateTempImage(req, res) {
    try {
      const { id } = req.params;
      const { userId, destinationId, package_tripId, reviewId, img } = req.body;
      const result = await temp_image.update({ userId, destinationId, package_tripId, reviewId, img }, { where: { id } });
      if (result[0] !== 0) {
        res.status(200).json({ message: `Image with id ${id} has been updated` });
      } else {
        res.status(404).json({ message: `Image can't be updated` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = TempImageController;
