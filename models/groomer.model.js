const mongoose = require('mongoose');

const groomerSchema = new mongoose.Schema(
    {
    groomerName: {
        type: String,
    },      
    groomerBio: {
        type: String,           
    }

})

const Groomer = mongoose.model('Groomer', groomerSchema);

module.exports = Groomer;