var inquirer = require("inquirer");
var mysql = require("mysql");
const { printTable } = require('console-table-printer');
var dotenv = require("dotenv")
dotenv.config();
const { title, allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: process.env.DB_USER,

    // Your password
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
    })
}

function showDepartments() {
    var query = "SELECT * FROM departments";
    connection.query(query, function (err, res) {
    printTable(res)  
    });
}

function showRoles() {
    var query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
    printTable(res)
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
    ]).then(function(answer) {
        var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        connection.query(query, [answer.fAdd, answer.lAdd, answer.rAdd, null], showEmployees);
    })
}

function addDepartments() {
    inquirer.prompt({
        name: "departmentAdd",
        type: "input",
        message: "Enter name of department to be added"
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
    ]).then(function(answer){
        var intS = parseInt(answer.sAdd);
        var intId = parseInt(answer.idAdd);
        var query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query, [answer.tAdd, intS, intId], showRoles);
    })
}

function updateRoles() {
    var idArr = [];
    var roleArr = [];
    var roleIDArr = [];
    var roleQuery = "SELECT * FROM role";
    connection.query(roleQuery, function (err, res) {
        res.forEach(obj => {
            roleArr.push(obj.title);
            roleIDArr.push(obj.id);
        })
    })
    var idQuery = "SELECT * FROM employee";
    connection.query(idQuery, function (err, res) {
        res.forEach(obj => {
            console.log("id: ", obj.id, " name: ", obj.first_name, " ", obj.last_name);
            idArr.push(obj.id);
        });

        inquirer.prompt([
            {
                name: "employeeId",
                type: "list",
                choices: idArr,
                message: "Select ID of employee you want to change role for"
            },
            {
                name: "newRole",
                type: "list",
                choices: roleArr,
                message: "Select new role for employee"
            }
        ]).then(function (answer) {
            var changeID = roleIDArr[roleArr.indexOf(answer.newRole)];
            var query = "UPDATE employee SET role_id = ? WHERE ?";
            connection.query(query, [changeID, { id: answer.employeeId }], function (err, res) {
                if (err) throw err;
            });
        });
    });
}