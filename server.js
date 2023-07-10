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

// Function to view all employees
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error("Error retrieving employees: ", err);
      return;
    }
    console.log("All Employees:");
    console.table(results);
    promptUser();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answers.name },
        (err, result) => {
          if (err) {
            console.error("Error adding department: ", err);
            return;
          }
          console.log("Department added successfully!");
          promptUser();
        }
      );
    });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answers.name },
        (err, result) => {
          if (err) {
            console.error("Error adding department: ", err);
            return;
          }
          console.log("Department added successfully!");
          promptUser();
        }
      );
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the role:",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.departmentId,
        },
        (err, result) => {
          if (err) {
            console.error("Error adding role: ", err);
            return;
          }
          console.log("Role added successfully!");
          promptUser();
        }
      );
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID for the employee:",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager ID for the employee (optional):",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleId,
          manager_id: answers.managerId || null,
        },
        (err, result) => {
          if (err) {
            console.error("Error adding employee: ", err);
            return;
          }
          console.log("Employee added successfully!");
          promptUser();
        }
      );
    });
}

// Function to update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee to update:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answers) => {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answers.roleId, answers.employeeId],
        (err, result) => {
          if (err) {
            console.error("Error updating employee role: ", err);
            return;
          }
          console.log("Employee role updated successfully!");
          promptUser();
        }
      );
    });
}