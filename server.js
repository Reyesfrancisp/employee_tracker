const inquirer = require("inquirer");
const connection = require("./db/connection");

// departments
const addDepartment = require("./models/departments/addDepartment");
const viewAllDepartments = require("./models/departments/viewAllDepartments");
const deleteDepartment = require("./models/departments/deleteDepartment");
const viewDepartmentBudget = require("./models/departments/viewDepartmentBudget");

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

// Function to prompt the user for the action to perform
const promptUser = () => {
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
          "Update the employee with a new manager",
          "Delete department",
          "Delete role",
          "Delete employee",
          "View employees by manager",
          "View the budget of a department",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      // Perform the selected action
      switch (answers.action) {
        case "View all departments":
          viewAllDepartments(promptUser);
          break;
        case "View all roles":
          viewAllRoles(promptUser);
          break;
        case "View all employees":
          viewAllEmployees(promptUser);
          break;
        case "Add a department":
          addDepartment(promptUser);
          break;
        case "Add a role":
          addRole(promptUser);
          break;
        case "Add an employee":
          addEmployee(promptUser);
          break;
        case "Update an employee role":
          updateEmployeeRole(promptUser);
          break;
        case "Update the employee with a new manager":
          updateEmployeeManager(promptUser);
          break;
        case "Delete department":
          deleteDepartment(promptUser);
          break;
        case "Delete role":
          deleteRole(promptUser);
          break;
        case "Delete employee":
          deleteEmployee(promptUser);
          break;
        case "View employees by manager":
          viewEmployeesByManager(promptUser);
          break;
          case "View the budget of a department":
          viewDepartmentBudget(promptUser);
          break;
        case "Exit":
          connection.end(); // Close the database connection
          console.log("Disconnected from the database.");
          return; // Exit the function to stop prompting
      }
    });
}

// Start the application
startApp();

// Function to start the application
function startApp() {
  console.log("Welcome to the Employee Management System!");
  promptUser();
}