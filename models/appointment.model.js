
const mongoose = require("mongoose");

//is this needed?
const bcrypt = require("bcrypt")

const appointmentSchema = new mongoose.Schema(
    {
    /*userEmail: {
        type: String, 
        required: true, 
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },*/     
    appointmentGroomer: {
        type: String, 
        required: true,
    },
    appointmentDate: {
        type: String, 
        required: true,
    },
    appointmentTime: { 
        type: String, 
        required: true, 
    },
    appointmentLocation: { 
        type: String, 
        required: true,
    },
    appointmentServices: { 
        type: String, 
        required: true,
    },
    appointmentPetName: {
        type: String,
        required: true,
    }
    
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;