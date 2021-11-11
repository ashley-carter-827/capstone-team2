const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
    {
    userEmail: {
        type: String, 
        required: true,
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },      
    petName: {
        type: String,
        required: true,
    },
    petGender: {
        type: String, 
        required: true,
    },
    petSpecies: {
        type: String, 
        required: true,       
    },
    petBirthday: {
        type: Date, 
        required: true,
        minlength: 2
    },
    petSize: {
        type: String, 
        required: true,        
    },
    petHairType: {
        type: String, 
        required: true,        
    },
    petLegs: {
        type: String, 
        required: true,        
    },
    petAllergies: {
        type: Boolean, 
        required: true,       
    },
    petAllergiesDetails: {
        type: String,                
    },
    petTemperament: {
        type: String, 
        required: true,       
    }

})
// do we need line 60-78 in user.model.js for security??

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;