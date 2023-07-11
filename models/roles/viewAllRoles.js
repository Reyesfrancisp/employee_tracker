const connection = require("../../db/connection");

// Function to view all roles
function viewAllRoles() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM role", (err, results) => {
      if (err) {
        console.error("Error retrieving roles: ", err);
        reject(err);
      } else {
        console.log("All Roles:");
        console.table(results);
        resolve(results);
      }
    });
  });
}

module.exports = viewAllRoles;