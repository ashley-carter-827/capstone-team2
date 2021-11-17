const express = require("express");
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the appointment controller to handle our user routes
const appointmentController = require("../controllers/appointment.controller")

//post route to create a appointment 
router.post("/", /*validateJwtMiddleware,*/ appointmentController.createAppointment)

//get route to return all appointments (requires auth)
router.get("/", validateJwtMiddleware, appointmentController.getAppointment)

//put route to update a appointment (requires auth)
router.put("/:email", validateJwtMiddleware, appointmentController.updateAppointment)

module.exports = router;
