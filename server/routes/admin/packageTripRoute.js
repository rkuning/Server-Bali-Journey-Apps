const packageTripRoutes = require("express").Router();
const { PackageTripController } = require("../../controllers");

packageTripRoutes.get("/", PackageTripController.getPackageTrip);
packageTripRoutes.get("/:id", PackageTripController.getPackageTrip);
packageTripRoutes.post("/", PackageTripController.addPackageTrip);
packageTripRoutes.delete("/:id", PackageTripController.deletePackageTrip);
packageTripRoutes.put("/:id", PackageTripController.updatePackageTrip);

module.exports = packageTripRoutes;
