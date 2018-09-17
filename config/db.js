
    const mysql = require('mysql');

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Test'
});

module.exports = con;



