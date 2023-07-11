const connection = require("../../db/connection");

// Function to view all departments
function viewAllDepartments(promptUser) {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.error("Error retrieving departments: ", err);
      promptUser();
      return;
    }

    console.log("All Departments:");
    console.table(results);
    promptUser();
  });
}

module.exports = viewAllDepartments;
