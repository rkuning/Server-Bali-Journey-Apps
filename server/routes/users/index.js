const userRoute = require("express").Router();
const { HomeController } = require("../../controllers");
const userDetailRoute = require("./userDetailRoute");
const userProfileRoute = require("./userProfileRoute");

userRoute.get("/", HomeController.home);
userRoute.use("/profile", userProfileRoute);
userRoute.use("/detail", userDetailRoute);
userRoute.get("/categories", HomeController.category);
userRoute.get("/categories/:id", HomeController.categoryId);
userRoute.get("/dest-by-cat/:id", HomeController.destByCat);
userRoute.get("/destinations", HomeController.allDestinations);
userRoute.get("/package-trips", HomeController.allPackageTrip);

module.exports = userRoute;
