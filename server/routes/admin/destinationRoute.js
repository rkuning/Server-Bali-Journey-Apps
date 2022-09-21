const destinationRoute = require("express").Router();
const { DestinationController } = require("../../controllers");
const { upload } = require("../../middlewares");

destinationRoute.get("/", DestinationController.getDestination);
destinationRoute.get("/:id", DestinationController.getDestinationId);
destinationRoute.post("/", upload.single("img"), DestinationController.addDestination);
destinationRoute.delete("/:id", DestinationController.deleteDestination);
destinationRoute.put("/:id", DestinationController.updateDestination);

module.exports = destinationRoute;
