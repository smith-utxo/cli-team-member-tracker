INSERT INTO deparments (name)  
VALUES 
('Engineering'), 
('Finance'),
('Legal'),
('Sales'); 

INSERT INTO roles (title, deparments_id, Salary)
VALUES
('Sales Lead', 4, 100000), 
('Salesperson', 4, 80000),
('Lead Engineer', 1, 150000),
('Software Engineer', 1, 120000), 
('Account Manager', 2, 160000),
('Accountant', 2, 125000),
('Legal Team Lead', 3, 250000),
('Lawyer', 3, 190000);

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES 
('John', 'Armstrong', 1, null), 
('Mike', "Johnson", 2, "John Armstrong"), 
("Ashley", "Rodriguez", 3, null), 
("Kevin", "Arnold", 4, "Ashely Rodriguez"),
("Kunal", "Singh", 5, null), 
("Malia", "Brown", 6, "Kunal Singh"),
("Sarah", "Lourd", 7, null), 
("Tom", "Allen", 8, "Sarah Lourd");
