const connection = require("../../db/connection");
const inquirer = require("inquirer");

//function to display the budget of each department
function departmentBudget() {
    return new Promise((resolve, reject) => {
      // Fetch department IDs and names from the database
      connection.query("SELECT id, name FROM department", (err, departments) => {
        if (err) {
          console.error("Error retrieving departments: ", err);
          reject(err);
        } else {
          // Store the department IDs and names in an array
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
  
              // Retrieve the sum of salaries for all employees in the department
              connection.query(
                "SELECT SUM(salary) AS totalBudget FROM employee JOIN role ON employee.role_id = role.id WHERE role.department_id = ?",
                [departmentId],
                (err, result) => {
                  if (err) {
                    console.error("Error calculating department budget: ", err);
                    reject(err);
                  } else {
                    const totalBudget = result[0].totalBudget;
                    console.log(`Total Utilized Budget of the Department: $${totalBudget}`);
                    resolve(totalBudget);
                  }
                }
              );
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }
  
  module.exports = departmentBudget;