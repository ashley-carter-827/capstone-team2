const Appointment = require("../models/appointment.model")

const appointmentController = {

 //method to get all appointments using async/await syntax
getAppointment: async function(req, res){

    let query = {}

    if(req.query.userEmail){
        const regex = new RegExp(`.*${req.query.userEmail}.*$`, "i")
        query.userEmail = {'$regex':regex}
    }
   //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let allAppointments = await Appointment.find(query)
        
        //return all the users that we found in JSON format
        res.json(allAppointments)
        
    } catch (error) {
        console.log("error getting all appointments: " + error)
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any recipes
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })

    }
},
//method to create a new appointment
createAppointment: async function(req, res){

    try {

        //store appointment data sent through the request
        const appointmentData = req.body;

        appointmentData.userEmail = req.user[0].email;

        //pass the appointmentData to the create method of the Appointment model
        let newAppointment = await Appointment.create(appointmentData)

        //return the newly created appointment
        res.status(201).json(newAppointment)
        
    } catch (error) {
        //handle errors creating appointment
        console.log("failed to create appointment: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

},
//method to update a appointment
updateAppointment: async function(req, res, next){

    try {

        //get the user email from the request params
        const email = req.params.email;

        //store appointment data sent through the request
        const newAppointmentData = req.body;

        //try to find our appointment by the user email provided in the request params
        const appointment = await Appointment.findByEmail(newAppointment.email);

        //update the appointment if we found a match and save or return a 404
        if(appointment){
            Object.assign(appointment, newAppointmentData)
            await appointment.save()
        }else{
            res.status(404).send({message: "Appointment not found", statusCode: res.statusCode});
        }

        //respond with updated appointment
        res.json(await Appointment.findByEmail(newAppointment.email));
        
    } catch (error) {
        console.log("failed to update appointment: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

}


}

module.exports = appointmentController;