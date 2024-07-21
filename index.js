const express = require('express')
const app = express()
const CORS = require('cors')
// const passport = require('passport')
const sessions = require('express-session')
const passport = require('./passport-auth')
const cookiesession = require('cookie-session')
// const cookiesession = require('express-session')
const cookie_parser = require('cookie-parser')
const { json } = require('body-parser')
const person = require('./person')
const post = require('./quepost')
const bodyParser = require('body-parser');
const postq = require('./quepost')

const options = {
    httpOnly: true ,
    secure: true,
    sameSite: 'None',
    httpFlag : true,
    // domain: 'controlsee-git-main-krishnas-projects-e88a8c5b.vercel.app',
    maxAge: 5 * 24*60*60*1000
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie_parser())
app.use(CORS({credentials: true, origin: 'https://controlsee-git-main-krishnas-projects-e88a8c5b.vercel.app', methods: "GET", 
    headers: ["Content-Type"],}
  ))

app.use('/', function (req, res, next){
    const url_ = req.query['rqst']
    console.log(url_)
    res.cookie('url_', url_, options)
    next()
})

app.get('/', passport.authenticate('google', {  
    scope: ['profile', 'email']
}))


app.use(passport.initialize())
    
app.get('/loggedin', passport.authenticate('google'), (req, res)=>{
    var url_ = req.cookies['url_']
    const ip = req.headers['x-forwarded-for'] || req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.socket.remoteAddress || "";
    res.cookie('PUERTOPONDICKMANNSON', req.user.gid+"%^&"+ip, options)
    res.redirect(
        url_
    )
    res.end()
})

app.get('/profile', async (req, res) => {
    var data = String(req.cookies['PUERTOPONDICKMANNSON']).split("%^&")
    const ip = req.headers['x-forwarded-for'] || req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.socket.remoteAddress || "";
    var ipu = data[1]
    data = data[0]
    // if(ipu != ip) {
    //     res.json({})
    //     return;
    // }
    var usr = await person.findOne({gid : data})
    if(!usr){
        res.json(req.cookies)
    } else
    res.json(usr)
})

app.post('/userpage', async (req, res)=>{
    var name = req.body
    console.log(name);
    var usr = await person.findOne(name)
    if(!usr){
        res.json({})
    } else
    res.send(usr)
})

app.post('/ques', (req, res)=>{
    var data = req.body
    data['mfg'] = new Date()
    postq(data)
    res.send("done")
})


app.listen(3000, ()=>console.log("http://localhost:3000"))

// http://localhost:5173/profile