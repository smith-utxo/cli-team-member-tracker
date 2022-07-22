const mysql = require('mysql2'); 

const connection = mysql.createConnection(
  {
  host: 'localHost', 
  user: 'root', 
  password: '577489tF$W87MMi',
  database: 'employee_tracker'
  }
);


module.exports = connection; 