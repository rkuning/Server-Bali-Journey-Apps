const route = require("express").Router();
const { homeRoute } = require("./home");
const adminRoute = require("./admin");
// const { valUser } = require("../middlewares");

route.use("/home", homeRoute);
route.use("/admin", adminRoute);

module.exports = route;
