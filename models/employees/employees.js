// Function to view all employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", (err, results) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
        return;
      }
      console.log("All Employees:");
      console.table(results);
      promptUser();
    });
  }

// Function to add an employee
function addEmployee() {
    // Fetch role IDs from the database
    connection.query("SELECT id, title FROM role", (err, results) => {
      if (err) {
        console.error("Error retrieving roles: ", err);
        return;
      }
  
      // Store the role IDs and titles in an array
      const roles = results.map((role) => ({
        name: role.title,
        value: role.id,
      }));
  
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Enter the employee's first name:",
          },
          {
            type: "input",
            name: "lastName",
            message: "Enter the employee's last name:",
          },
          {
            type: "list",
            name: "roleId",
            message: "Select the role for the employee:",
            choices: roles,
          },
          {
            type: "input",
            name: "managerId",
            message: "Enter the manager ID for the employee (optional):",
          },
        ])
        .then((answers) => {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: answers.roleId,
              manager_id: answers.managerId || null,
            },
            (err, result) => {
              if (err) {
                console.error("Error adding employee: ", err);
                return;
              }
              console.log("Employee added successfully!");
            }
          );
        });
    });
  }
  
  
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

  
// Function to update an employee's manager
function updateEmployeeManager() {
    // Fetch employee IDs from the database
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
        return;
      }
  
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee to update:",
          choices: empResults.map((employee) => ({
            name: employee.name,
            value: employee.id,
          })),
        },
        {
          type: "list",
          name: "managerId",
          message: "Select the new manager for the employee:",
          choices: empResults.map((employee) => ({
            name: employee.name,
            value: employee.id,
          })),
        },
      ])
      .then((answers) => {
        connection.query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [answers.managerId, answers.employeeId],
          (err, result) => {
            if (err) {
              console.error("Error updating employee manager: ", err);
              return;
            }
            console.log("Employee manager updated successfully!");
          }
        );
      });
    });
  }
  

  // Function to view employees by manager
function viewEmployeesByManager() {
    // Fetch manager IDs and names from the database
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, empResults) => {
      if (err) {
        console.error("Error retrieving employees: ", err);
        return;
      }
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "managerId",
            message: "Select a manager to view their employees:",
            choices: empResults.map((employee) => ({
              name: employee.name,
              value: employee.id,
            })),
          },
        ])
        .then((answers) => {
          connection.query(
            "SELECT * FROM employee WHERE manager_id = ?",
            [answers.managerId],
            (err, results) => {
              if (err) {
                console.error("Error retrieving employees: ", err);
                return;
              }
              console.log("Employees under selected manager:");
              console.table(results);
              promptUser();
            }
          );
        });
    });
  }

  module.exports 