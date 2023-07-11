const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to delete a role
function deleteRole(promptUser) {
  // Fetch role IDs and titles from the database
  connection.query("SELECT id, title FROM role", (err, results) => {
    if (err) {
      console.error("Error retrieving roles: ", err);
      promptUser();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "roleId",
          message: "Select a role to delete:",
          choices: results.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query(
          "DELETE FROM role WHERE id = ?",
          [answers.roleId],
          (err, result) => {
            if (err) {
              console.error("Error deleting role: ", err);
              promptUser();
              return;
            }
            console.log("Role deleted successfully!");
            promptUser();
          }
        );
      });
  });
}

module.exports = deleteRole;