var mongoose = require('mongoose')

// creating a schema
const personSchema = mongoose.Schema({
    name: {
        type:String,
        minLength: 1,
    },
    gid: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true
    }
 });

module.exports =  mongoose.model("person", personSchema )
 