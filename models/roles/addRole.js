const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to add a role
function addRole() {
  // Fetch department IDs from the database
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, name FROM department", (err, results) => {
      if (err) {
        console.error("Error retrieving departments: ", err);
        return;
      }

      // Store the department IDs and names in an array
      const departments = results.map((department) => ({
        name: department.name,
        value: department.id,
      }));
      console.log("Inquirer should prompt here.");
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
            type: "list",
            name: "departmentId",
            message: "Select the department for the role:",
            choices: departments,
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
            }
          );
        });
    });
  });
}

module.exports = addRole;