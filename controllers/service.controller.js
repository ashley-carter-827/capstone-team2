const Service = require("../models/service.model")

const serviceController = {

 //method to get all services using async/await syntax
 getServices: async function(req, res){

    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let allServices = await Service.find({})
        
        //return all the users that we found in JSON format
        res.json(allServices)
        
    } catch (error) {
        console.log("error getting all services: " + error)
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any recipes
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })

    }
},
//method to create a new service
createService: async function(req, res){

    try {

        //store service data sent through the request
        const serviceData = req.body;

        serviceData.userEmail = req.user[0].email;

        //pass the serviceData to the create method of the service model
        let newService = await Service.create(serviceData)

        //return the newly created service
        res.status(201).json(newService)
        
    } catch (error) {
        //handle errors creating service
        console.log("failed to create service: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

},
//method to update a service
updateService: async function(req, res, next){

    try {

        //get the user email from the request params
        const email = req.params.email;

        //store service data sent through the request
        const newServiceData = req.body;

        //try to find our service by the user email provided in the request params
        const service = await Service.findByEmail(newService.email);

        //update the service if we found a match and save or return a 404
        if(service){
            Object.assign(service, newServiceData)
            await service.save()
        }else{
            res.status(404).send({message: "Service not found", statusCode: res.statusCode});
        }

        //respond with updated service
        res.json(await Service.findByEmail(newService.email));
        
    } catch (error) {
        console.log("failed to update user: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

}


}

module.exports = serviceController;