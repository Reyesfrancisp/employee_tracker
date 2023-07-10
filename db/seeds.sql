-- Departments
INSERT INTO department (name) VALUES
    ("Information Technology"),
    ("Personal Banking"),
    ("Risk Management"),
    ("Human Resources"),
    ("Treasury Department"),
    ("Customer Service"),
    ("Facility Management"),
    ("Banking Department"),
    ("Accounting");

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
  -- Information Technology
  ("IT Manager", 60000.00, 1),
  ("Software Engineer", 50000.00, 1),
  ("Systems Administrator", 55000.00, 1),
  ("Database Administrator", 55000.00, 1),

  -- Personal Banking
  ("Personal Banking Manager", 55000.00, 2),
  ("Financial Advisor", 45000.00, 2),
  ("Loan Officer", 50000.00, 2),
  ("Teller", 32000.00, 2),

  -- Risk Management
  ("Risk Manager", 60000.00, 3),
  ("Compliance Officer", 55000.00, 3),
  ("Risk Analyst", 50000.00, 3),
  ("Fraud Investigator", 52000.00, 3),

  -- Human Resources
  ("HR Manager", 60000.00, 4),
  ("Recruiter", 50000.00, 4),
  ("HR Specialist", 45000.00, 4),
  ("Compensation Analyst", 52000.00, 4),

  -- Treasury Department
  ("Treasury Manager", 65000.00, 5),
  ("Financial Analyst", 55000.00, 5),
  ("Cash Management Specialist", 52000.00, 5),
  ("Investment Analyst", 60000.00, 5),

  -- Customer Service
  ("Customer Service Manager", 55000.00, 6),
  ("Customer Support Specialist", 42000.00, 6),
  ("Call Center Representative", 32000.00, 6),
  ("Client Relations Coordinator", 45000.00, 6),

  -- Facility Management
  ("Facilities Manager", 60000.00, 7),
  ("Maintenance Supervisor", 50000.00, 7),
  ("Space Planner", 55000.00, 7),
  ("Facilities Coordinator", 42000.00, 7),

  -- Banking Department
  ("Banking Manager", 60000.00, 8),
  ("Banking Operations Officer", 55000.00, 8),
  ("Banking Analyst", 52000.00, 8),
  ("Mortgage Specialist", 52000.00, 8),

  -- Accounting
  ("Accounting Manager", 60000.00, 9),
  ("Financial Controller", 55000.00, 9),
  ("Accounts Payable Specialist", 45000.00, 9),
  ("Accounts Receivable Clerk", 42000.00, 9);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  -- Information Technology
  ("James", "Duclose", 1, NULL),
  ("Sammy", "Smith", 2, 1),
  ("Mike", "Johnson", 3, 1),
  ("Sarah", "Williams", 4, 1),

  -- Personal Banking
  ("David", "Lee", 5, NULL),
  ("Emily", "Wilson", 6, 5),
  ("Ryan", "Anderson", 7, 5),
  ("Olivia", "Taylor", 8, NULL),

  -- Risk Management
  ("Andrew", "Clark", 9, NULL),
  ("Sophia", "Thomas", 10, 9),
  ("Jacob", "Brown", 11, 9),
  ("Mia", "Davis", 12, 9),

  -- Human Resources
  ("William", "Moore", 13, NULL),
  ("Ava", "Garcia", 14, 13),
  ("James", "Martinez", 15, 13),
  ("Charlotte", "Anderson", 16, NULL),

  -- Treasury Department
  ("Benjamin", "Lopez", 17, NULL),
  ("Amelia", "Wilson", 18, 17),
  ("Henry", "Hall", 19, 17),
  ("Ella", "Young", 20, 17),

  -- Customer Service
  ("Noah", "Scott", 21, NULL),
  ("Sophie", "Harris", 22, 21),
  ("Daniel", "Turner", 23, NULL),
  ("Lily", "Lewis", 24, 21),

  -- Facility Management
  ("Logan", "King", 25, NULL),
  ("Grace", "Walker", 26, 25),
  ("Samuel", "Allen", 27, 25),
  ("Victoria", "Wright", 28, 25),

  -- Banking Department
  ("Jackson", "Mitchell", 29, NULL),
  ("Nora", "Young", 30, 29),
  ("Owen", "Turner", 31, 29),
  ("Isabella", "Hill", 32, 29),

  -- Accounting
  ("Gabriel", "Baker", 33, NULL),
  ("Sofia", "Carter", 34, 33),
  ("Elijah", "Morris", 35, 33),
  ("Avery", "Roberts", 36, 33);