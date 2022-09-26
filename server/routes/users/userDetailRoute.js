const userDetailRoute = require("express").Router();
const { UserDetailController } = require("../../controllers");

userDetailRoute.get("/dest/:id", UserDetailController.detailDest);
userDetailRoute.get("/pack/:id", UserDetailController.detailPack);

module.exports = userDetailRoute;
