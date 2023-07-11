const connection = require("../../db/connection");

function addDepartment() {
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
            return;
          }
          console.log("Department added successfully!");
        }
      );
    });
}

module.exports = addDepartment;