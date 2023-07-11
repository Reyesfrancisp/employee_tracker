const connection = require("../../db/connection");

// Function to view all employees
function viewAllEmployees() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employee", (err, results) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
        reject(err);
      } else {
        console.log("All Employees:");
        console.table(results);
        resolve(results);
      }
    });
  });
}

module.exports = viewAllEmployees;