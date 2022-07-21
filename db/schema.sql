DROP TABLE IF EXISTS roles; 
DROP TABLE IF EXISTS deparments; 
DROP TABLE IF EXISTS employees; 


/*must define departments table first since foreign keys rely on it in other tables*/
CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(30) NOT NULL 
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(30) NOT NULL, 
  department VARCHAR(30) NOT NULL, 
  salary INTEGER NOT NULL,
  departments_id INTEGER, 
  CONSTRAINT fk_deparments FOREIGN KEY (departments_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees ( 
  id INTEGER AUTO_INCREMENT PRIMARY KEY, 
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(30) NOT NULL,
  roles_id INTEGER, 
  CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE SET NULL
);

