// var mongoose = require('mongoose')
const question = require("./question")
//IUCg8diS4cJDSayg

async function postq(data){
    var qsn = new question(data);
    await qsn.save()
}

module.exports = postq;