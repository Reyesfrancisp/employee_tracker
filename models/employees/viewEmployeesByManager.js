const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to view employees by manager
function viewEmployeesByManager(promptUser) {
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
    if (err) {
      console.error("Error retrieving employees: ", err);
      promptUser();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "managerId",
          message: "Select a manager to view their employees:",
          choices: empResults.map((employee) => ({
            name: employee.name,
            value: employee.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query(
          "SELECT * FROM employee WHERE manager_id = ?",
          [answers.managerId],
          (err, results) => {
            if (err) {
              console.error("Error retrieving employees: ", err);
              promptUser();
            } else {
              console.log("Employees under selected manager:");
              console.table(results);
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
}

module.exports = viewEmployeesByManager;