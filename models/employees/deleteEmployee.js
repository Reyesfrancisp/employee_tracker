const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to delete an employee
function deleteEmployee() {
  // Fetch employee IDs and names from the database
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, results) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
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
                return;
              }
              console.log("Employee deleted successfully!");
              promptUser();
            }
          );
        });
    });
  });
}
module.exports = deleteEmployee;