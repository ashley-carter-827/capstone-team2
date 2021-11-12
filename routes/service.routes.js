const express = require("express");
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the service controller to handle our service routes
const serviceController = require("../controllers/service.controller")

//post route to create a service (service registration)
router.post("/", validateJwtMiddleware, serviceController.createService)

//get route to return all services
router.get("/", serviceController.getServices)

//put route to update a service (requires auth)
router.put("/:email", validateJwtMiddleware, serviceController.updateService)

module.exports = router;
