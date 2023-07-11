const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to add an employee
function addEmployee() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, title FROM role", (err, results) => {
      if (err) {
        console.error("Error retrieving roles: ", err);
        reject(err);
      } else {
        const roles = results.map((role) => ({
          name: role.title,
          value: role.id,
        }));

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
              type: "list",
              name: "roleId",
              message: "Select the role for the employee:",
              choices: roles,
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
                  reject(err);
                } else {
                  console.log("Employee added successfully!");
                  resolve(result);
                }
              }
            );
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

module.exports = addEmployee;