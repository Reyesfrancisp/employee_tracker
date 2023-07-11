const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to delete a department
function deleteDepartment(promptUser) {
  connection.query("SELECT id, name FROM department", (err, results) => {
    if (err) {
      console.error("Error retrieving departments: ", err);
      promptUser();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Select a department to delete:",
          choices: results.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query(
          "DELETE FROM department WHERE id = ?",
          [answers.departmentId],
          (err, result) => {
            if (err) {
              console.error("Error deleting department: ", err);
              promptUser();
            } else {
              console.log("Department deleted successfully!");
              promptUser();
            }
          }
        );
      })
      .catch((err) => {
        console.error(err);
        promptUser();
      });
  });
}

module.exports = deleteDepartment;
