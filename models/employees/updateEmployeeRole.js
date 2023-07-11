const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to update an employee role
function updateEmployeeRole(promptUser) {
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
    if (err) {
      console.error("Error retrieving employees: ", err);
      promptUser();
      return;
    }

    connection.query("SELECT id, title FROM role", (err, roleResults) => {
      if (err) {
        console.error("Error retrieving roles: ", err);
        promptUser();
        return;
      }

      const employees = empResults.map((employee) => ({
        name: employee.name,
        value: employee.id,
      }));

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
                console.error("Error updating employee role: ", err);
              } else {
                console.log("Employee role updated successfully!");
              }
              promptUser();
            }
          );
        })
        .catch((err) => {
          console.error(err);
          promptUser();
        });
    });
  });
}

module.exports = updateEmployeeRole;
