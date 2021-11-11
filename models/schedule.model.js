
const mongoose = require("mongoose");

//is this needed?
const bcrypt = require("bcrypt")

const scheduleSchema = new mongoose.Schema(
    {
    userEmail: {
        type: String, 
        required: true, 
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },      
    scheduleGroomer: {
        type: String, 
        required: true,
    },
    scheduleDate: {
        type: String, 
        required: true,
    },
    scheduleTime: { 
        type: String, 
        required: true, 
    },
    scheduleLocation: { 
        type: String, 
        required: true,
    },
    scheduleServices: { 
        type: String, 
        required: true,
    }
    
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;