const express = require("express");
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the groomer controller to handle our groomer routes
const groomerController = require("../controllers/groomer.controller")

//post route to create a groomer (groomer registration)
router.post("/", validateJwtMiddleware, groomerController.createGroomer)

//get route to return all groomer
router.get("/", groomerController.getGroomers)

//put route to update a groomer (requires auth)
router.put("/:email", validateJwtMiddleware, groomerController.updateGroomer)

module.exports = router;
