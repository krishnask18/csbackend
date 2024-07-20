const mongoose = require('mongoose');

const quesSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    title:String,
    desc:String,
    lang:String,
    code:{
        type:String,
        required:false
    },
    ans:{
        type:[],
        required:false
    },
    mfg:{
        type:Date,
        immutable:true
    }
 });

module.exports =  mongoose.model("question", quesSchema )