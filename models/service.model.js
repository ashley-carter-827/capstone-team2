const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
    hairlessWaxing: {
        type: String,
    },      
    teethfangCleaning: {
        type: String,
    },
    washDry: {
        type: String,
    },
    moisturize: {      
        type: String,
    },
    facials: {
        type: String,
    },
    maniPedi: {
        type: String,      
    },
    hairColor: {
        type: String,        
    },
    hairCut: {
        type: String,        
    },
    massage: {
        type: String,      
    },
    exfoliation: {
        type: String,                
    },
    bodyArt: {
        type: String, 
    }

})
// do we need line 60-78 in user.model.js for security??

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;