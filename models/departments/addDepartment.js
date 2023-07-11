const connection = require("../../db/connection");
const inquirer = require("inquirer");

//function to add a department
function addDepartment() {
  return new Promise((resolve, reject) => {
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
              reject(err);
            } else {
              console.log("Department added successfully!");
              resolve(result);
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = addDepartment;
