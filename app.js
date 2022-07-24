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
        case 'Quit':
          process.exit();
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
  /*
    .then(({title, salary, department}) => {
      const sql = connection.query(
        `INSERT INTO roles (title, salary, department)
        VALUES (?, ?, ?)`,
      });
      menu();
      */
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
      /*
      connection.query('INSERT INTO departments SET label = ?', insert );
      */
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