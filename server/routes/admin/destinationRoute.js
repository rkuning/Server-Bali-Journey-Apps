const destinationRoute = require("express").Router();
const { DestinationController } = require("../../controllers");

destinationRoute.get("/", DestinationController.getDestination);
destinationRoute.get("/:id", DestinationController.getDestinationId);
destinationRoute.post("/", DestinationController.addDestination);
destinationRoute.delete("/:id", DestinationController.deleteDestination);
destinationRoute.put("/:id", DestinationController.updateDestination);

module.exports = destinationRoute;
