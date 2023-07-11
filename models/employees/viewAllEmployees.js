const connection = require("../../db/connection");

// Function to view all employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", (err, results) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
        return;
      }
      console.log("All Employees:");
      console.table(results);
    });
  }

  module.exports = viewAllEmployees;