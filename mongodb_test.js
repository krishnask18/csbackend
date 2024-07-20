var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require("body-parser")
var person = require("./person")
var app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.set("strictQuery", false);

// connecting do db

// oauth QRdmUKZ6fk23ATFF

mongoose.connect(
   // "mongodb+srv://oauth:QRdmUKZ6fk23ATFF@firstcluster.4rc4s.mongodb.net/oauth-c0?retryWrites=true&w=majority",
   "mongodb+srv://oauth:QRdmUKZ6fk23ATFF@google-auth-test0.asrttqu.mongodb.net/oauth0?appName=mongosh+2.2.9",
   // 'https://cloud.mongodb.com/v2/645fe7d9808c4426cadcc4c0#/connect/Cluster0',
   // {
   //    useNewUrlParser: true,
   //    useUnifiedTopology: true,
   //    useCreateIndex: true,   },

   // ()=>{
   //    console.log("connected");
   // },
   (e)=>{
      console.log(e);
   });
   
async function savedata(){
      // // how to create new person object. This variable is just a local copy (unsaved in database)
      var person1 = new person({name:"krishnaam", age:25, hobbies:["pa", "asdf"]})
      // // saving the person1 object to db
      await person1.save().then(()=>console.log("saved"))

      // await person.create({name:"krishnaam", age:25, email:"Shiri", hobbies:["asking"], friend:"6671d00a8ff30a3ce78a0eae"}).then((e)=>{console.log(e?e:"DONE")})
      // console.log(person1);
      // // var krishna = await person.find({name:"krishna"})
      // // var krishna = await person
      // // .where("age").gt(12)
      // // .where("name").equals("krishnaam")
      // // .where("email").equals("shiri")
      // // .populate("friend")
      // // var krishna = person.findbyName("krishnaaam")
      // // console.log(krishna);
      // // person1.sayHi();
}
savedata();
app.listen(400, ()=>console.log("http://localhost:400"))