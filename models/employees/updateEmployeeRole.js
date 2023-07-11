const connection = require("../../db/connection");

  
  // Function to update an employee role
  function updateEmployeeRole() {
    // Fetch employee IDs from the database
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
        return;
      }
  
      // Fetch role IDs from the database
      connection.query("SELECT id, title FROM role", (err, roleResults) => {
        if (err) {
          console.error("Error retrieving roles: ", err);
          return;
        }
  
        // Store the employee IDs and names in an array
        const employees = empResults.map((employee) => ({
          name: employee.name,
          value: employee.id,
        }));
  
        // Store the role IDs and titles in an array
        const roles = roleResults.map((role) => ({
          name: role.title,
          value: role.id,
        }));
  
        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Select the employee to update:",
              choices: employees,
            },
            {
              type: "list",
              name: "roleId",
              message: "Select the new role for the employee:",
              choices: roles,
            },
          ])
          .then((answers) => {
            connection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [answers.roleId, answers.employeeId],
              (err, result) => {
                if (err) {
                  console.error("Error updating employee role: ", err);
                  return;
                }
                console.log("Employee role updated successfully!");
              }
            );
          });
      });
    });
  }

  module.exports = updateEmployeeRole;