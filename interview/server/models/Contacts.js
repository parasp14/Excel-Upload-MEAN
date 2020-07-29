const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let contacts = new Schema({
   first_name: {
      type: String
   },
   last_name: {
      type: String
   },
   email: {
       type: String,
       unique: true
   }
   
}, {
   collection: 'contacts'
})

module.exports = mongoose.model('contacts', contacts)