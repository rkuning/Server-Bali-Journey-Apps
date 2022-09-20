const route = require("express").Router();
const { homeRoute } = require("./home");

route.use("/", homeRoute);

module.exports = route;
