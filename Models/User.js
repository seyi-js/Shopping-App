var mongoose = require('mongoose');

// Comment Model
var userSchema =new mongoose.Schema({
    user_id : {
       type: Number,
       // required: true
    },
    name : {
       type: String
    },
    email : {
        type: String,
        required: true,
        unique: true
     },
     password : {
        type: String,
        required: true
     },
    register_date : {
        type: Date,
        default: Date.now
     }
    

   });



 const User = mongoose.model('users',/*collection name*/ userSchema)
  module.exports = User;
