var inquirer = require("inquirer");
var mysql = require("mysql");
const { printTable } = require('console-table-printer');
var dotenv = require("dotenv")
dotenv.config();
const { title, allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,


    port: 3306,

    
    user: process.env.DB_USER,


    password: process.env.DB_PASS,
    database: "employeesdb"
});

var optionsList = [
    {
        type: "list",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add an employee",
            "Add a department",
            "Add a role",
            "Update employee role",
            "Quit"
        ],
        name: "choice",
        message: "What would you like to do?"
    }
];

connection.connect(function (err) {
    if (err) throw err;
    console.log("Error")
    init();
})

function init() {
    inquirer.prompt(optionsList).then(function (response) {
        switch (response.choice) {
            case "View all employees":
                showEmployees();
                break;
            case "View all departments":
                showDepartments();
                break;
            case "View all roles":
                showRoles();
                break;
            case "Add an employee":
                addEmployees();
                break;
            case "Add a department":
                addDepartments();
                break;
            case "Add a role":
                addRoles();
                break;
            case "Update employee role":
                updateRoles();
                break;
            case "Quit":
                break;
        }
    });
}

function showEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function (err, res) {
        printTable(res)
        init()
    })
}

function showDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, function (err, res) {
        printTable(res)
        init()
    });
}

function showRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
        printTable(res)
        init()
    })
}

function addEmployees() {
    inquirer.prompt([
        {
            name: "fAdd",
            type: "input",
            message: "Enter employee first name"
        },
        {
            name: "lAdd",
            type: "input",
            message: "Enter employee last name"
        },
        {
            name: "rAdd",
            type: "input",
            message: "Enter role id"
        }
    ]).then(function (answer) {
        var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        connection.query(query, [answer.fAdd, answer.lAdd, answer.rAdd, null], showEmployees);
    })
}

function addDepartments() {
    inquirer.prompt({
        name: "departmentAdd",
        type: "input",
        message: "Enter department name"
    }).then(function (answer) {
        var query = "INSERT INTO departments (name) VALUES (?)";
        connection.query(query, answer.departmentAdd, showDepartments);
    });
}

function addRoles() {
    inquirer.prompt([
        {
            name: "tAdd",
            type: "input",
            message: "Enter role title"
        },
        {
            name: "sAdd",
            type: "input",
            message: "Enter salary"
        },
        {
            name: "idAdd",
            type: "input",
            message: "Enter department ID"
        }
    ]).then(function (answer) {
        var intS = parseInt(answer.sAdd);
        var intId = parseInt(answer.idAdd);
        var query = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query, [answer.tAdd, intS, intId], showRoles);
    })
}

function updateRoles() {
    var idArr = [];
    var roleArr = [];
    var roleQuery = "SELECT * FROM roles";
    connection.query(roleQuery, function (err, res) {
        res.forEach(obj => {
            roleArr.push({
                name: obj.title,
                value: obj.id
            })
        })

        var idQuery = "SELECT * FROM employees";
        connection.query(idQuery, function (err, res) {
            res.forEach(obj => {
                idArr.push({
                    name: obj.first_name + " " + obj.last_name,
                    value: obj.id
                })
            });

            inquirer.prompt([
                {
                    name: "employeeId",
                    type: "list",
                    choices: idArr,
                    message: "Select ID of employee to change role"
                },
                {
                    name: "newRole",
                    type: "list",
                    choices: roleArr,
                    message: "Select new role for employee"
                }
            ]).then(function (answer) {
                var query = "UPDATE employees SET role_id = ? WHERE ?";
                connection.query(query, [answer.newRole, { id: answer.employeeId }], function (err, res) {
                    if (err) throw err;
                    showEmployees()
                });
            });
        });
    });
}