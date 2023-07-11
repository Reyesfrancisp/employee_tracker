const connection = require("../../db/connection");

// Function to view all employees
function viewAllEmployees(promptUser) {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error("Error retrieving employees: ", err);
      promptUser();
      return;
    }

    console.log("All Employees:");
    console.table(results);
    promptUser();
  });
}

module.exports = viewAllEmployees;