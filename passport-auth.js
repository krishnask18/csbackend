const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
var mongoose = require('mongoose')
var person = require("./person")
const ObjectId = mongoose.Types.ObjectId;


mongoose.set("strictQuery", false);

mongoose.connect(
    "mongodb+srv://oauth:IUCg8diS4cJDSayg@google-auth-test0.asrttqu.mongodb.net/oauth0?appName=mongosh+2.2.9",()=>{console.log("connected");}
)

passport.use(
    new GoogleStrategy({
        clientID:"403480712512-ijv0sd2c1kl53it0cn9ekcomfgpmr2ua.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:'https://csbackend-git-main-krishnas-projects-e88a8c5b.vercel.app/loggedin',
    },
        async (accessToken, refreshToken, profile, done)=>{
            if(
                await person.findOne({gid:profile['id']}) == undefined
            ) {
                var usr = new person({name:profile['displayName'], gid:profile['id'], email:(profile['emails'])[0]['value']})
                await usr.save()
                done(null, usr)
            }
            else{
                var usr = new person({name:profile['displayName'], gid:profile['id'], email:(profile['emails'])[0]['value']})
                console.log("User already there");
                done(null, usr)
            }
        }
    )
)

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    person.findById(ObjectId(id), ((err, user)=>{
        done(null, user);
    }))
});

module.exports = passport;