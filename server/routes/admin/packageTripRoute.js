const packageTripRoutes = require("express").Router();
const { PackageTripController } = require("../../controllers");
const { upload } = require("../../middlewares");

packageTripRoutes.get("/", PackageTripController.getPackageTrip);
packageTripRoutes.get("/:id", PackageTripController.getPackageTripId);
packageTripRoutes.post("/:id", PackageTripController.addPackageDestination);
packageTripRoutes.post("/", upload.single("img"), PackageTripController.addPackageTrip);
packageTripRoutes.delete("/:id", PackageTripController.deletePackageTrip);
packageTripRoutes.delete("/dest/:id", PackageTripController.deletePackageDestination);
packageTripRoutes.put("/:id", PackageTripController.updatePackageTrip);

module.exports = packageTripRoutes;
