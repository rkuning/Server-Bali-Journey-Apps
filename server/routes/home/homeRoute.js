const homeRoute = require("express").Router();
const { HomeController } = require("../../controllers");

homeRoute.get("/", (req, res) => res.json("homepage"));
homeRoute.post("/login", HomeController.login);
homeRoute.post("/register", HomeController.register);

module.exports = homeRoute;
