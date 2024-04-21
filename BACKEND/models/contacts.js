
const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    massage:{
        type:String,
        require:true
    },
    reply:{
        type: String,
    },
  

});



module.exports =  mongoose.model("contact", contactSchema);