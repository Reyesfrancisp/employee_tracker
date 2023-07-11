const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to add a department
function addDepartment(promptUser) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answers.name },
        (err, result) => {
          if (err) {
            console.error("Error adding department: ", err);
          } else {
            console.log("Department added successfully!");
          }
          promptUser();
        }
      );
    })
    .catch((err) => {
      console.error(err);
      promptUser();
    });
}

module.exports = addDepartment;
