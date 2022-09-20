const route = require("express").Router();
const { homeRoute } = require("./home");
const { adminRoute } = require("./admin");

route.use("/home", homeRoute);
route.use("/admin", adminRoute);

module.exports = route;
