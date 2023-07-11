const connection = require("../../db/connection");
const inquirer = require("inquirer");

// Function to display the budget of each department
function departmentBudget(promptUser) {
  connection.query("SELECT id, name FROM department", (err, departments) => {
    if (err) {
      console.error("Error retrieving departments: ", err);
      promptUser();
      return;
    }

    const departmentChoices = departments.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Select a department to calculate the budget:",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        const departmentId = answers.departmentId;

        connection.query(
          "SELECT SUM(salary) AS totalBudget FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?",
          [departmentId],
          (err, result) => {
            if (err) {
              console.error("Error calculating department budget: ", err);
              promptUser();
            } else {
              const totalBudget = result[0].totalBudget;
              console.log(`Total Utilized Budget of the Department: $${totalBudget}`);
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

module.exports = departmentBudget;
