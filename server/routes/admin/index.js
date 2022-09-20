const adminRoute = require("express").Router();
const { valAdmin } = require("../../middlewares/valAdmin");
const categoryRoutes = require("./category");

adminRoute.get("/", valAdmin, (req, res) =>
  res.json({ message: "Home Page dashboard admin" })
);

adminRoute.use("/categories", valAdmin, categoryRoutes);

module.exports = adminRoute;
