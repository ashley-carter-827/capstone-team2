const express = require('express');
const router = express.Router();

//import the hubs controller to handle our hubs routes
const hubsController = require("../controllers/hubs.controller")

//post route to create a hub (hub registration)
router.post("/", hubsController.createHub)

//get route to return all hubs **no validator yet, not sure if needed 
router.get("/", hubsController.getHubs)

//put route to update a hub **no validator yet, not sure if needed 
router.put("/:id", hubsController.updateHub)

//delete route to delete a hub **no validator yet, not sure if needed 
router.delete("/:id", hubsController.deleteHub)


module.exports = router;