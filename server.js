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
          viewAllDepartments().then(() => {
            // Proceed with other code here
            promptUser();
          }).catch((error) => {
            console.error("Error viewing all departments:", error);
            promptUser();
          });
          break;
        case "View all roles":
          viewAllRoles().then(() => {
            // Proceed with other code here
            promptUser();
          }).catch((error) => {
            console.error("Error viewing all roles:", error);
            promptUser();
          });
          break;
        case "View all employees":
          viewAllEmployees().then(() => {
            // Proceed with other code here
            promptUser();
          }).catch((error) => {
            console.error("Error viewing all employees:", error);
            promptUser();
          });
          break;
        case "Add a department":
          addDepartment().then(() => {
            console.log("Department added successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error adding department:", error);
            promptUser();
          });
          break;
        case "Add a role":
          addRole().then(() => {
            console.log("Role added successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error adding role:", error);
            promptUser();
          });
          break;
        case "Add an employee":
          addEmployee().then(() => {
            console.log("Employee added successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error adding employee:", error);
            promptUser();
          });
          break;
        case "Update an employee role":
          updateEmployeeRole().then(() => {
            console.log("Employee role updated successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error updating employee role:", error);
            promptUser();
          });
          break;
        case "Update employee manager":
          updateEmployeeManager().then(() => {
            console.log("Employee manager updated successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error updating employee manager:", error);
            promptUser();
          });
          break;
        case "Delete department":
          deleteDepartment().then(() => {
            console.log("Department deleted successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error deleting department:", error);
            promptUser();
          });
          break;
        case "Delete role":
          deleteRole().then(() => {
            console.log("Role deleted successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error deleting role:", error);
            promptUser();
          });
          break;
        case "Delete employee":
          deleteEmployee().then(() => {
            console.log("Employee deleted successfully!");
            promptUser();
          }).catch((error) => {
            console.error("Error deleting employee:", error);
            promptUser();
          });
          break;
        case "View employees by manager":
          viewEmployeesByManager().then(() => {
            // Proceed with other code here
            promptUser();
          }).catch((error) => {
            console.error("Error viewing employees by manager:", error);
            promptUser();
          });
          break;
        case "Exit":
          connection.end(); // Close the database connection
          console.log("Disconnected from the database.");
          return; // Exit the function to stop prompting
      }
    });
}