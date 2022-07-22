const inquirer = require('inquirer');
const fs = require('fs');
const connection = require('./db/connection');


const menu = () => {
  return inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'menu',
      choices: ['Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'View All Employees', 'Quit'],
    }])
    .then(selection => {
      switch (selection.menu) {
        case 'Update Employee Role':
          UpdateEmployeeRoles();
          break;
        case 'View All Roles':
          viewAllRoles();
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
      }
    })
}


const UpdateEmployeeRoles = () => {
  inquirer.prompt(
    [{
      type: 'list',
      name: 'roles',
      message: 'Which role do you want to update?',
      choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
    }]
  )
  menu();
}

const viewAllRoles = () => { 
  const sql = `SELECT * FROM roles`;
  connection.query(sql, (err, rows) => {
    console.table(rows);
    menu(); 
  })
 }

const addRole = () => { }

const viewAllDepartments = () => { }

const addDepartment = () => { }

const viewAllEmployees = () => { }


menu(); 