//const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./app/routes/auth-routes');
const profileRoutes = require('./app/routes/profile-routes');

const passportSetup = require('./config/passport-setup')
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

const mysql = require('mysql');
const con = require('./config/db');

const app = express();

const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', function(req, res){
    res.render('home');
});

con.connect(function (err) {
    if (err) throw err;
    else {
        console.log('Connected');
        require('./app/routes/test_routes/login_route.js')(app, mysql, con);
        app.listen(port, () => {
            console.log('Server running');
        });
    }

});




