const mysql = require('mysql');

// Create a connection pool to the database
var pool = mysql.createPool({
    host: 'localhost',            
    user: 'root',                 
    password: '123456',           
    database: 'book',             
    connectionLimit: 15,          
    multipleStatements: true      
});

module.exports = pool; // Export the pool for use elsewhere in the application
