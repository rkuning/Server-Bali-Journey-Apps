const { review, temp_image, user, destination, package_trip } = require("../../models");

class ReviewController {
  static async getReview(req, res) {
    try {
      let result = [];
      const reviews = await review.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [user, destination, package_trip],
      });
      for (let i in reviews) {
        let reviewId = reviews[i].id;
        let images = await temp_image.findAll({ attributes: ["id", "reviewId", "img"], where: { reviewId } });
        let data = { ...reviews[i].dataValues, images };
        result.push(data);
      }
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

  //bagian admin hanya bisa menampilkan, menghapus / mengubah saja.
  static async addReview(req, res) {
    try {
      const { comment, rating, userId, destinationId, package_tripId } = req.body;
      const img = req.file.path;
      if (typeof destinationId !== "undefined") {
        let valReview = await review.findOne({ where: { userId, destinationId } });
        if (valReview) {
          res.status(200).json({ message: `User already add a comment!` });
        } else {
          let result = await review.create({ comment, rating, userId, destinationId, package_tripId });
          await temp_image.create({ reviewId: result.id, img });
          const jmlRating = await review.findAll({ where: { destinationId } });
          let hasil = 0;
          jmlRating.forEach((rat) => {
            hasil += rat.rating;
          });
          let newRating = hasil / jmlRating.length;
          await destination.update({ rating: newRating }, { where: { id: destinationId } });
          res.status(201).json(result);
        }
      }
      if (typeof package_tripId !== "undefined") {
        let valReview = await review.findOne({ where: { userId, package_tripId } });
        if (valReview) {
          res.status(200).json({ message: `User already add a comment!` });
        } else {
          let result = await review.create({ comment, rating, userId, destinationId, package_tripId });
          await temp_image.create({ reviewId: result.id, img });
          const jmlRating = await review.findAll({ where: { package_tripId } });
          let hasil = 0;
          jmlRating.forEach((rat) => {
            hasil += rat.rating;
          });
          let newRating = hasil / jmlRating.length;
          await package_trip.update({ rating: newRating }, { where: { id: package_tripId } });
          res.status(201).json(result);
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const dataReview = await review.findOne({ where: { id } });
      if (dataReview) {
        if (dataReview.destinationId !== null) {
          await review.destroy({ where: { id } });
          const jmlRating = await review.findAll({ where: { destinationId: dataReview.destinationId } });
          let hasil = 0;
          jmlRating.forEach((rat) => (hasil += rat.rating));
          let newRating = hasil / jmlRating.length;
          await destination.update({ rating: +newRating }, { where: { id: dataReview.destinationId } });
          res.status(200).json({ message: `Review with id ${id} has been deleted` });
        }
        if (dataReview.package_tripId !== null) {
          await review.destroy({ where: { id } });
          const jmlRating = await review.findAll({ where: { package_tripId: dataReview.package_tripId } });
          let hasil = 0;
          jmlRating.forEach((rat) => (hasil += rat.rating));
          let newRating = hasil / jmlRating.length;
          await package_trip.update({ rating: newRating }, { where: { id: dataReview.package_tripId } });
          res.status(200).json({ message: `Review with id ${id} has been deleted` });
        }
      } else {
        res.status(404).json({ msg: "Review not found!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { comment, rating, userId, destinationId, package_tripId } = req.body;
      const result = await review.update({ comment, rating, userId, destinationId, package_tripId }, { where: { id } });
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
