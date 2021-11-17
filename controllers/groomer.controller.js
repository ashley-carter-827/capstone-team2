const Groomer = require("../models/groomer.model")

const groomerController = {

 //method to get all groomers using async/await syntax
 getGroomers: async function(req, res){

    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let allGroomers = await Groomer.find({})
        
        //return all the users that we found in JSON format
        res.json(allGroomers)
        
    } catch (error) {
        console.log("error getting all groomers: " + error)
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any recipes
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })

    }
},
//method to create a new groomer
createGroomer: async function(req, res){

    try {

        //store groomer data sent through the request
        const groomerData = req.body;

        groomerData.userEmail = req.user[0].email;

        //pass the groomerData to the create method of the groomer model
        let newGroomer = await Groomer.create(groomerData)

        //return the newly created groomer
        res.status(201).json(newGroomer)
        
    } catch (error) {
        //handle errors creating groomer
        console.log("failed to create groomer: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

},
//method to update a groomer
updateGroomer: async function(req, res, next){

    try {

        //get the user email from the request params
        const email = req.params.email;

        //store groomer data sent through the request
        const newGroomerData = req.body;

        //try to find our groomer by the user email provided in the request params
        const groomer = await Groomer.findByEmail(newGroomer.email);

        //update the groomer if we found a match and save or return a 404
        if(groomer){
            Object.assign(groomer, newGroomerData)
            await groomer.save()
        }else{
            res.status(404).send({message: "Groomer not found", statusCode: res.statusCode});
        }

        //respond with updated groomer
        res.json(await Groomer.findByEmail(newGroomer.email));
        
    } catch (error) {
        console.log("failed to update user: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

}


}

module.exports = groomerController;