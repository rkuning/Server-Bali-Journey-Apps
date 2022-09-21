const adminRoute = require("express").Router();
const categoryRoutes = require("./categoryRoute");
const destinationRoutes = require("./destinationRoute");
const userRoutes = require("./userRoute");

adminRoute.get("/", (req, res) =>
  res.json({ message: "Home Page dashboard admin" })
);
adminRoute.use("/categories", categoryRoutes);
adminRoute.use("/destinations", destinationRoutes);
adminRoute.use("/users", userRoutes);

module.exports = adminRoute;
