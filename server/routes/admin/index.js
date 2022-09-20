const adminRoute = require("express").Router();
const categoryRoutes = require("./categoryRoute");

adminRoute.get("/", (req, res) => res.json({ message: "Home Page dashboard admin" }));
adminRoute.use("/categories", categoryRoutes);

module.exports = adminRoute;
