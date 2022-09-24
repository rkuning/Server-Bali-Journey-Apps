const reviewRoutes = require("express").Router();
const { ReviewController } = require("../../controllers");
const { upload } = require("../../middlewares");

reviewRoutes.get("/destinations", ReviewController.getReviewDestinations);
reviewRoutes.get("/packageTrips", ReviewController.getReviewPackages);
reviewRoutes.get("/detail/:id", ReviewController.getReviewId);
reviewRoutes.post("/", upload.single("img"), ReviewController.addReview);
reviewRoutes.delete("/:id", ReviewController.deleteReview);
reviewRoutes.put("/:id", ReviewController.updateReview);

module.exports = reviewRoutes;
