
const mongoose = require("mongoose");

//is this needed?
const bcrypt = require("bcrypt")

const appointmentSchema = new mongoose.Schema(
    {
    userEmail: {
        type: String, 
        required: true, 
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    appointmentPetName: {
        type: String,
        required: true,
    },     
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
    }
    
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;