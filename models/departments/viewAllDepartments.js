const connection = require("../../db/connection");

// Function to view all departments
function viewAllDepartments() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM department", (err, results) => {
      if (err) {
        reject(err); // Reject the promise with the error
        return;
      }
      console.log("All Departments:");
      console.table(results);
      resolve(); // Resolve the promise
    });
  });
}


module.exports = viewAllDepartments;