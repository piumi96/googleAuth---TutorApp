
const router = require('express').Router();
const passport = require('passport');

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/logout', function(req, res){
    //handle with passport
    //res.send('logging out');
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), function(req, res){
    console.log(req.user);
    res.redirect('/profile/');
});

router.post('/google/login', function(req, res){
    var googleToken = require('../config/passport-setup');
    const con = require('../config/db');
    var sql = "insert into google_login values('"+record.username+"','"+record.googleId+"')";
    con.query(sql, function(err, result){
        if(err) throw err;
        else{
            res.status(200),send({
                msg: result
            });
        }
    });

}); 

module.exports = router;