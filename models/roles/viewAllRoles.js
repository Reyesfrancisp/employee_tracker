const connection = require("../../db/connection");

// Function to view all roles
function viewAllRoles(promptUser) {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.error("Error retrieving roles: ", err);
      promptUser();
      return;
    }

    console.log("All Roles:");
    console.table(results);
    promptUser();
  });
}

module.exports = viewAllRoles;