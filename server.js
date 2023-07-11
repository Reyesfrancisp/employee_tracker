
const inquirer = require("inquirer");
const connection = require("./db/connection");

// departments
const addDepartment = require("./models/departments/addDepartment");
const viewAllDepartments = require("./models/departments/viewAllDepartments");
const deleteDepartment =  require("./models/departments/viewAllDepartments");

// roles
const viewAllRoles = require("./models/roles/viewAllRoles");
const deleteRole = require("./models/roles/deleteRole");
const addRole = require("./models/roles/addRole");

// employees
const addEmployee = require("./models/employees/addEmployee");
const deleteEmployee = require("./models/employees/deleteEmployee");
const updateEmployeeManager = require("./models/employees/updateEmployeeManager");
const updateEmployeeRole = require("./models/employees/updateEmployeeRole");
const viewAllEmployees = require("./models/employees/viewAllEmployees");
const viewEmployeesByManager = require("./models/employees/viewEmployeesByManager");


  // Prompt user for the desired action
  promptUser();
// Function to prompt the user for the action to perform
function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Update employee manager",
          "Delete department",
          "Delete role",
          "Delete employee",
          "View employees by manager",
          "Exit"
        ]
      }
    ])
    .then((answers) => {
      // Perform the selected action
      switch (answers.action) {
        case "View all departments":
          viewAllDepartments();
          promptUser();
          break;
        case "View all roles":
          viewAllRoles();
          promptUser();
          break;
        case "View all employees":
          viewAllEmployees();
          promptUser();
          break;
        case "Add a department":
          addDepartment();
          promptUser();
          break;
        case "Add a role":
          addRole();
          promptUser();
          break;
        case "Add an employee":
          addEmployee();
          promptUser();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          promptUser();
          break;
        case "Update employee manager":
          updateEmployeeManager();
          promptUser();
          break;
        case "Exit":
          connection.end(); // Close the database connection
          console.log("Disconnected from the database.");
          break;
      }
    });
}