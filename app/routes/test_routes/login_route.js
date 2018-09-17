module.exports = function(app, mysql, con){

    //CRUD operations with database-----------------------------------------

    app.post('/', (req, res) => {
        var username = req.body.username;
        var pword = req.body.pword;
        var sql = "insert into Reg_user values('"+req.body.username+"', '"+req.body.pword+"')";
        console.log(username);
        con.query(sql, (err, result) => {
            if (err) { throw err; }
            else {
                res.status(200).send({
                    msg: "success"
                });
                //res.render();
            }
        });
        
    });

    app.get('/', function(req, res){
        var sql = 'select * from Reg_user';
        con.query(sql, function(err, result){
            if(err) throw err;
            else{
                res.status(200).send({
                    msg: result
                });
            }
        });
    });

    app.delete('/:username', function(req, res){
        var username = req.params.username;
        var sql = "delete from Reg_user where username='"+username+"'";
        con.query(sql, function(err, result){
            if(err) throw err;
            else{
                res.status(200).send({
                    msg: "delete successful"
                });
            }
        });
    });

    app.put('/', function(req, res){
        var username = req.body.username;
        var pword = req.body.pword;
        var stat;
        var sql = "update Reg_user set pword='"+pword+"' where username='"+username+"'";
        con.query(sql, function(err, result){
            if(err) throw err;
            else{
                res.status(200).send({
                    msg: "success"
                });
                
            }
        });
    });
    

    //logging in--------------------------------------------------------

    app.post('/login', function(req, res){
        var username = req.body.username;
        var pword = req.body.pword;
        console.log(username);
        console.log(pword);
        var sql = "call login('"+username+"', '"+pword+"', @stat)";

        var stat = con.query(sql, function(err, result){
            if(err) throw err;
            else{
                res.status(200).json(result);
                stat = result.map(({object}) => ({"@stat": stat}));
                console.log(stat);
            }
        });

        
    });


    //testing------------------------------------------------------------------------------
    //hot teachers route-----------
    
    app.get('/hotTeachers', function(req, res, next){
        var hotTeacher = require('./hotTeacher.html');
        res.status(200).send(hotTeacher);
    });

    app.post('/test', function(req, res){
        console.log("success");
        res.status(200).send({
            msg: "Connected"
        });
    });
};


