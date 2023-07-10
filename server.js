const mysql = require("mysql2");
const inquirer = require("inquirer");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_db"
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the database!");
  // Prompt user for the desired action
  promptUser();
});

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
          "Exit"
        ]
      }
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
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end(); // Close the database connection
          console.log("Disconnected from the database.");
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.error("Error retrieving departments: ", err);
      return;
    }
    console.log("All Departments:");
    console.table(results);
    promptUser();
  });
}

// Function to view all roles
function viewAllRoles() {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.error("Error retrieving roles: ", err);
      return;
    }
    console.log("All Roles:");
    console.table(results);
    promptUser();
  });
}