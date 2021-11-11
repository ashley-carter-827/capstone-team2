const Schedule = require("../models/schedule.model")

const scheduleController = {

 //method to get all schedules using async/await syntax
 getSchedule: async function(req, res){

    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let allSchedules = await Schedule.find({})
        
        //return all the users that we found in JSON format
        res.json(allSchedules)
        
    } catch (error) {
        console.log("error getting all schedules: " + error)
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any recipes
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })

    }
},
//method to create a new schedule
createSchedule: async function(req, res){

    try {

        //store schedule data sent through the request
        const scheduleData = req.body;

        scheduleData.userEmail = req.user[0].email;

        //pass the scheduleData to the create method of the Schedule model
        let newSchedule = await Schedule.create(scheduleData)

        //return the newly created schedule
        res.status(201).json(newSchedule)
        
    } catch (error) {
        //handle errors creating schedule
        console.log("failed to create schedule: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

},
//method to update a schedule
updateSchedule: async function(req, res, next){

    try {

        //get the user email from the request params
        const email = req.params.email;

        //store schedule data sent through the request
        const newScheduleData = req.body;

        //try to find our schedule by the user email provided in the request params
        const schedule = await Schedule.findByEmail(newSchedule.email);

        //update the schedule if we found a match and save or return a 404
        if(schedule){
            Object.assign(schedule, newScheduleData)
            await schedule.save()
        }else{
            res.status(404).send({message: "Schedule not found", statusCode: res.statusCode});
        }

        //respond with updated schedule
        res.json(await Schedule.findByEmail(newSchedule.email));
        
    } catch (error) {
        console.log("failed to update schedule: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

}


}

module.exports = scheduleController;