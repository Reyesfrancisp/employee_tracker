const inquirer = require("inquirer");
const connection = require("./db/connection");

// departments
const addDepartment = require("./models/departments/addDepartment");
const viewAllDepartments = require("./models/departments/viewAllDepartments");
const deleteDepartment = require("./models/departments/deleteDepartment");

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

// Start the application
startApp();

// Function to start the application
function startApp() {
  console.log("Welcome to the Employee Management System!");
  promptUser();
}

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
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      // Perform the selected action
      switch (answers.action) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          console.log("left the add role");
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole()
          .then(() => {
            console.log("Employee role update completed.");
            // Proceed with other code here
          })
          .catch((error) => {
            console.error("Error updating employee role:", error);
            // Handle the error
          });
          break;
        case "Update employee manager":
          updateEmployeeManager();
          break;
        case "Delete department":
          deleteDepartment();
          break;
        case "Delete role":
          deleteRole();
          break;
        case "Delete employee":
          deleteEmployee();
          break;
        case "View employees by manager":
          viewEmployeesByManager();
          break;
        case "Exit":
          connection.end(); // Close the database connection
          console.log("Disconnected from the database.");
          return; // Exit the function to stop prompting
      }
    });
}
