const reviewRoutes = require("express").Router();
const { ReviewController } = require("../../controllers");

reviewRoutes.get("/", ReviewController.getReview);
reviewRoutes.get("/:id", ReviewController.getReviewId);
reviewRoutes.post("/", ReviewController.addReview);
reviewRoutes.delete("/:id", ReviewController.deleteReview);
reviewRoutes.put("/:id", ReviewController.updateReview);

module.exports = reviewRoutes;
