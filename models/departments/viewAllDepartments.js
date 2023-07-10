const connection = require("../../db/connection");

// Function to view all departments
function viewAllDepartments() {
    connection.query("SELECT * FROM department", (err, results) => {
      if (err) {
        console.error("Error retrieving departments: ", err);
        return;
      }
      console.log("All Departments:");
      console.table(results);
    });
  }

  module.exports = viewAllDepartments;