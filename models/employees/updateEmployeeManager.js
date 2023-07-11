const connection = require("../../db/connection");
  
// Function to update an employee's manager
function updateEmployeeManager() {
    // Fetch employee IDs from the database
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
        return;
      }
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee to update:",
          choices: empResults.map((employee) => ({
            name: employee.name,
            value: employee.id,
          })),
        },
        {
          type: "list",
          name: "managerId",
          message: "Select the new manager for the employee:",
          choices: empResults.map((employee) => ({
            name: employee.name,
            value: employee.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [answers.managerId, answers.employeeId],
          (err, result) => {
            if (err) {
              console.error("Error updating employee manager: ", err);
              return;
            }
            console.log("Employee manager updated successfully!");
          }
        );
      });
    });
  }

  module.exports = updateEmployeeManager;