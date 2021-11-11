const express = require('express');
const router = express.Router();

//import the clinics controller to handle our clinic routes
const clinicsController = require("../controllers/clinics.controller")

//post route to create a clinic (clinic registration)
router.post("/", clinicsController.createClinic)

//get route to return all clinics **no validator yet, not sure if needed 
router.get("/", clinicsController.getClinics)

//put route to update a clinic **no validator yet, not sure if needed 
router.put("/:id", clinicsController.updateClinic)

//delete route to delete a clinic **no validator yet, not sure if needed 
router.delete("/:id", clinicsController.deleteClinic)


module.exports = router;