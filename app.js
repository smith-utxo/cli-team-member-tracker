const inquirer = require('inquirer');
const fs = require('fs');
const connection = require('./db/connection');
const mysql = require('mysql2');

const menu = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menu',
      choices: ['Update Employee Role', 'Add Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'View All Employees', 'Quit'],
    }])
    .then(selection => {
      switch (selection.menu) {
        case 'Update Employee Role':
          UpdateEmployeeRoles();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Quit':
          process.exit();
      }
    })
}


const UpdateEmployeeRoles = () => {
  inquirer.prompt(
    [{
      type: 'input',
      name: 'employee',
      message: 'Please Enter the Employees ID you want to udpate.'
    },
    {
      type: 'input', 
      name: 'role',
      message: 'Please Enter the Employees new Role ID.'
    }]
  )
      .then(function(answers) {
        const employee = answers.employee; 
        const role = answers.role; 

        const sql = `UPDATE employees SET roles_id = "${role}" WHERE id = "${employee}"`;

        connection.query(sql, function(err, res) {
          if(err){
            throw err; 
          }
          console.log("Employees Role has been updated!"); 
          menu(); 
        })
      })
  }

const addEmployee = () => {
  inquirer.prompt(
    [{
      type: 'input',
      name: 'fname',
      message: 'What is the employees first name?',

    },
    {
      type: 'input',
      name: 'lname',
      message: 'What is the employees last name?'
    },
    {
      type: 'input',
      name: 'role',
      message: 'What is the employees role ID #?',
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Who is the employees manager?', 
    }
  ])
  .then(function(answers) {
    const firstName = answers.fname; 
    const lastName = answers.lname; 
    const role = answers.role; 
    const mgr = answers.manager; 

    const sql = `INSERT INTO employees (first_name, last_name, roles_id, manager) VALUES ("${firstName}", "${lastName}", "${role}", "${mgr}")`;

    connection.query(sql, function(err, res) {
      if(err) {
        throw err; 
      }
      console.log("Employee " + firstName + " " + lastName + " Added!" );
      menu(); 
    })
  })
}

const viewAllRoles = () => {
  const sql = `SELECT * FROM roles`;
  connection.query(sql, (err, rows) => {
    console.table(rows);
    menu();
  })
}

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'list',
      name: 'department',
      message: 'Which department does the role belong to?1=Engineering 2=finance 3=Sales 4=Legal',
      choices: [1, 2, 3, 4]
    }
  ])
    .then(function (answers) {
      const role_title = answers.title;
      const role_salary = answers.salary;
      const role_department = answers.department;

      const sql = `INSERT INTO roles (title, salary, departments_id) VALUES ("${role_title}", "${role_salary}", "${role_department}")`;
      connection.query(sql, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        menu();
      })
    })
  }

const viewAllDepartments = () => {
  const sql = `SELECT * from departments`;
  connection.query(sql, (err, rows) => {
    console.table(rows);
    menu();
  })
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'label',
      message: 'What is the name of the department you would like to add?'
    }
  ])
    .then(function (answers) {
      const newDepartment = answers.label;
      const sql = `INSERT INTO departments (label) VALUES ("${newDepartment}")`;
      connection.query(sql, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        menu();
      })
    })
}

const viewAllEmployees = () => {
  const sql = `SELECT * from employees`;
  connection.query(sql, (err, rows) => {
    console.table(rows);
    menu();
  })
}



menu(); 