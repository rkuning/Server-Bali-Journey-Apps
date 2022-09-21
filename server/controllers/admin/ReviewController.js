const { review } = require("../../models");

class ReviewController {
  static async getReview(req, res) {
    try {
      let result = await review.findAll();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getReviewId(req, res) {
    try {
      const { id } = req.params;
      const result = await review.findOne({ where: { id } });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async addReview(req, res) {
    try {
      const { comment, rating, userId, destinationId, package_tripId } = req.body;
      let result = await review.create({
        comment,
        rating,
        userId,
        destinationId,
        package_tripId,
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const result = await review.destroy({ where: { id } });
      if (result !== 0) {
        res.status(200).json({ message: `Review with id ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Review can't be deleted` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { comment, rating, userId, destinationId, package_tripId } = req.body;
      const result = await review.update(
        {
          comment,
          rating,
          userId,
          destinationId,
          package_tripId,
        },

        { where: { id } }
      );

      if (result[0] !== 0) {
        res.status(200).json({ message: `Review with id ${id} has been updated` });
      } else {
        res.status(404).json({ message: `Review can't be updated` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ReviewController;
