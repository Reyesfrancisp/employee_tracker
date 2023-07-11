const connection = require("../../db/connection");
  
  // Function to view employees by manager
function viewEmployeesByManager() {
    // Fetch manager IDs and names from the database
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
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
                return;
              }
              console.log("Employees under selected manager:");
              console.table(results);
              promptUser();
            }
          );
        });
    });
  }

  module.exports = viewEmployeesByManager;