const route = require("express").Router();
const { homeRoute } = require("./home");
const adminRoute = require("./admin");
const userRoute = require("./users");
const { valUser } = require("../middlewares");

route.use("/home", homeRoute);
route.use("/admin", adminRoute);
route.use("/users", valUser, userRoute);

module.exports = route;
