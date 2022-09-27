const HomeController = require("./home/HomeController");
const CategoryController = require("./admin/CategoryController");
const DestinationController = require("./admin/DestinationController");
const UserController = require("./admin/UserController");
const ReviewController = require("./admin/ReviewController");
const TempImageController = require("./admin/TempImageController");
const PackageTripController = require("./admin/PackageTripController");
const UserProfileController = require("./users/UserProfileController");
const UserDetailController = require("./users/UserDetailController");
const UserWishlistController = require("./users/UserWishlistController");

module.exports = {
  HomeController,
  CategoryController,
  DestinationController,
  UserController,
  ReviewController,
  TempImageController,
  PackageTripController,
  UserProfileController,
  UserDetailController,
  UserWishlistController,
};
