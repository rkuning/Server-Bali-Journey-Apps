const homeRoute = require("express").Router();

homeRoute.get("/", (req, res) => res.json("homepage"));
homeRoute.post("/login", (req, res) => res.json("login page"));
homeRoute.post("/register", (req, res) => res.json("register page"));

module.exports = homeRoute;
