const express = require("express");
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the schedule controller to handle our user routes
const scheduleController = require("../controllers/schedule.controller")

//post route to create a schedule 
router.post("/", validateJwtMiddleware, scheduleController.createSchedule)

//get route to return all schedules (requires auth)
router.get("/", validateJwtMiddleware, scheduleController.getSchedule)

//put route to update a schedule (requires auth)
router.put("/:email", validateJwtMiddleware, scheduleController.updateSchedule)

module.exports = router;
