const packageTripRoutes = require("express").Router();
const { PackageTripController } = require("../../controllers");
const { upload } = require("../../middlewares");

packageTripRoutes.get("/", PackageTripController.getPackageTrip);
packageTripRoutes.get("/:id", PackageTripController.getPackageTripId);
packageTripRoutes.post("/", upload.single("img"), PackageTripController.addPackageTrip);
packageTripRoutes.delete("/:id", PackageTripController.deletePackageTrip);
packageTripRoutes.put("/:id", PackageTripController.updatePackageTrip);

module.exports = packageTripRoutes;
