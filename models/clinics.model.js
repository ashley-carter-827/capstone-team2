const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  area: String,
  clinic: {
    type: String, 
    required: true,
    minlength: 3
  },
  doctor: [String],
  address: {
    type: String, 
    required: true,
    minlength: 4
  },
  phoneNumber: {
    type: String, 
    required: true,
    match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g, "Invalid Phone Number"]
  },
  faxNumber: String,
  website: String,
  specialty: String,
  notes: String,
  email: { 
    type: String,
    match: [/.+\@.+\..+/, "Invalid E-mail Address"],
  },
  caseCoordinator: String,
  alternatePhoneNumbers: String,

  latitude: Number,
  longitude: Number
})

const Clinic = new mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;