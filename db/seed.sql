USE employeesdb;

INSERT INTO departments
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("HR"),
    ("IT");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Salesperson", 70000, 1),
    ("Head of Sales", 120000, 1),
    ("Junior Software Engineer", 75000, 2),
    ("Head of Software Engineering", 125000, 2),
    ("Junior HR Associate", 50000, 3),
    ("Head of HR", 90000, 3),
    ("Junior IT", 70000, 4),
    ("Head of IT", 93000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Erin", "Duffy", 1, NULL),
    ("Clifton", "Dan", 2, 1),
    ("John", "Boo", 3, NULL),
    ("Thomas", "Clancy", 4, 3),
    ("Kyle", "Romero", 5, NULL),
    ("Ed", "Stead", 6, 5),
    ("Sean", "Ryan", 7, NULL),
    ("Jangwoo", "Lee", 8, 7);