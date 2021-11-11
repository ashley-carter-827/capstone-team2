const Pet = require("../models/pet.model")

const petController = {

 //method to get all pets using async/await syntax
 getPets: async function(req, res){

    //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
    try {
        
        //use our model to find users that match a query.
        //{} is the current query which really mean find all the users
        //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
        let allPets = await Pet.find({})
        
        //return all the users that we found in JSON format
        res.json(allPets)
        
    } catch (error) {
        console.log("error getting all pets: " + error)
        //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any recipes
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })

    }
},
//method to create a new pet
createPet: async function(req, res){

    try {

        //store pet data sent through the request
        const petData = req.body;

        petData.userEmail = req.user[0].email;

        //pass the petData to the create method of the Pet model
        let newPet = await Pet.create(petData)

        //return the newly created pet
        res.status(201).json(newPet)
        
    } catch (error) {
        //handle errors creating pet
        console.log("failed to create pet: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

},
//method to update a pet
updatePet: async function(req, res, next){

    try {

        //get the user email from the request params
        const email = req.params.email;

        //store pet data sent through the request
        const newPetData = req.body;

        //try to find our pet by the user email provided in the request params
        const pet = await Pet.findByEmail(newPet.email);

        //update the pet if we found a match and save or return a 404
        if(pet){
            Object.assign(pet, newPetData)
            await pet.save()
        }else{
            res.status(404).send({message: "Pet not found", statusCode: res.statusCode});
        }

        //respond with updated pet
        res.json(await Pet.findByEmail(newPet.email));
        
    } catch (error) {
        console.log("failed to update user: " + error)
        res.status(400).json({
            message: error.message,
            statusCode: res.statusCode
        })
    }

}


}

module.exports = petController;