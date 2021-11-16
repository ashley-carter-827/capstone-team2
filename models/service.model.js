const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
    serviceName: {
        type: String,
    },      
    serviceDescription: {
        type: String,
    },
    servicePrice: {
        type: String,
    },
    serviceDuration: {      
        type: String,  
    },
    serviceImage: {      
        type: String,       
    }

})
// do we need line 60-78 in user.model.js for security??

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;