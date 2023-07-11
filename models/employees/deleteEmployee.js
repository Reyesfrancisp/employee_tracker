const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to delete an employee
function deleteEmployee(promptUser) {
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, results) => {
    if (err) {
      console.error("Error retrieving employees: ", err);
      promptUser();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee to delete:",
          choices: results.map((employee) => ({
            name: employee.name,
            value: employee.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query(
          "DELETE FROM employee WHERE id = ?",
          [answers.employeeId],
          (err, result) => {
            if (err) {
              console.error("Error deleting employee: ", err);
              promptUser();
            } else {
              console.log("Employee deleted successfully!");
              promptUser();
            }
          }
        );
      })
      .catch((err) => {
        console.error(err);
        promptUser();
      });
  });
}

module.exports = deleteEmployee;
