const reviewRoutes = require("express").Router();
const { ReviewController } = require("../../controllers");
const { upload } = require("../../middlewares");

reviewRoutes.get("/", ReviewController.getReview);
reviewRoutes.get("/:id", ReviewController.getReviewId);
reviewRoutes.post("/", upload.single("img"), ReviewController.addReview);
reviewRoutes.delete("/:id", ReviewController.deleteReview);
reviewRoutes.put("/:id", ReviewController.updateReview);

module.exports = reviewRoutes;
