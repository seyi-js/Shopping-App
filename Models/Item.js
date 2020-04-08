var mongoose = require('mongoose');

// Comment Model
var itemSchema =new mongoose.Schema({
    item_id : {
       type: Number,
       // required: true
    },
    item : {
       type: String
    },
    date : {
        type: Date,
        default: Date.now
     }
    

   });



 const Item = mongoose.model('items',/*collection name*/ itemSchema)
  module.exports = Item;
