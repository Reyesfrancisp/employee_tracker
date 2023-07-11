const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to update an employee role
function updateEmployeeRole() {
  return new Promise((resolve, reject) => {
    // Fetch employee IDs from the database
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
      if (err) {
        reject(err);
        return;
      }

      // Fetch role IDs from the database
      connection.query("SELECT id, title FROM role", (err, roleResults) => {
        if (err) {
          reject(err);
          return;
        }

        // Store the employee IDs and names in an array
        const employees = empResults.map((employee) => ({
          name: employee.name,
          value: employee.id,
        }));

        // Store the role IDs and titles in an array
        const roles = roleResults.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Select the employee to update:",
              choices: employees,
            },
            {
              type: "list",
              name: "roleId",
              message: "Select the new role for the employee:",
              choices: roles,
            },
          ])
          .then((answers) => {
            connection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [answers.roleId, answers.employeeId],
              (err, result) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve();
              }
            );
          });
      });
    });
  });
}

module.exports = updateEmployeeRole;