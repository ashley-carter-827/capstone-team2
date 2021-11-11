const express = require("express");
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the pet controller to handle our user routes
const petController = require("../controllers/pet.controller")

//post route to create a pet (pet registration)
router.post("/", validateJwtMiddleware, petController.createPet)

//get route to return all pets (requires auth)
router.get("/", validateJwtMiddleware, petController.getPets)

//put route to update a pet (requires auth)
router.put("/:email", validateJwtMiddleware, petController.updatePet)

module.exports = router;
