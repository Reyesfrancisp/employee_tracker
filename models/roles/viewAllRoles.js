const connection = require("../../db/connection");

// Function to view all roles
function viewAllRoles() {
    connection.query("SELECT * FROM role", (err, results) => {
      if (err) {
        console.error("Error retrieving roles: ", err);
        return;
      }
      console.log("All Roles:");
      console.table(results);
    });
  }

  module.exports = viewAllRoles;