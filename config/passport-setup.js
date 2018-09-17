const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const con = require('./db');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy({
        callbackURL: 'http://localhost:4000/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //console.log('passport callback function fired');
        //console.log(profile);
//-----------------------------------------------------------------------------------
        
        username = profile.displayName;
        id = profile.id;
        token = {
            username,
            id
        };

        var sql2 = "select * from google_login where googleID='"+id+"'"
        con.query(sql2, function(err, result){
            if(err) throw err;
            else if(result.length > 0){
                console.log('Registered user');
                done(null, token);
            }
            else{
            var sql = "insert into google_login(username, googleID) values('"+username+"','"+id+"')";
            con.query(sql, function(err, result){
            if(err) throw err;
            else{
                console.log(token);
                done(null, token);
                }
        });
            }  
        });

        
        
    })
)