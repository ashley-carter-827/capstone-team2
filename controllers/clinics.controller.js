//Import our model so we can us it to interact with the realated data in MongoDB
const Clinic = require("../models/clinics.model")


//build our controller that will have our CRUD and other methods for our clinics
const clinicsController = {

    //method to get all users using async/await syntax
    getClinics: async function (req, res) {

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {

            //use our model to find users that match a query.
            //{} is the current query which really mean find all the clinics
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allClinics = await Clinic.find({})

            //return all the clinics that we found in JSON format
            res.json(allClinics)

        } catch (error) {
            console.log("error getting all clinics: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any clinics
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },
    //method to update clinic
    updateClinic: async function (req, res, next) {

        try {

            //get the clinic id from the request params
            const clinicId = req.params.id;

            //store clinic data sent through the request
            const newClinicData = req.body;

            //try to find our clinic by the id provided in the request params
            const clinic = await Clinic.findById(clinicId);

            //update the clinic if we found a match and save or return a 404
            if (clinic) {
                Object.assign(clinic, newClinicData)
                await clinic.save()
            } else {
                res.status(404).send({ message: "Clinic not found", statusCode: res.statusCode });
            }

            //respond with updated clinic
            res.json(await Clinic.findById(clinic._id))

        } catch (error) {
            console.log("failed to update clinic: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    //method to create a new client
    createClinic: async function (req, res) {

        try {

            //store clinic data sent through the request
            const clinicData = req.body;

            //pass the clinicData to the create method of the Clinic model
            let newClinic = await Clinic.create(clinicData)

            //return the newly created clinic
            res.status(201).json(await Clinic.findById(newClinic._id))

        } catch (error) {
            //handle errors creating clinic
            console.log("failed to create clinic: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    },
    //method to delete clinic
    deleteClinic: async function (req, res, next) {

        try {

            //get the clinic id from the request params
            const clinicId = req.params.id;

            //try to find our clinic by the id provided in the request params
            const clinic = await Clinic.findById(clinicId);

            //delete the clinic if we found a match or return a 404
            if (clinic) {
                Clinic.deleteOne(clinic, (error) => {
                    if (error)
                        throw error});
                res.status(202).send({ message: "Clinic deleted", statusCode: res.statusCode });
            } else {
                res.status(404).send({ message: "Clinic not found to delete", statusCode: res.statusCode });
            }
        } catch (error) {
            console.log("failed to delete clinic: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    }
}


module.exports = clinicsController;

