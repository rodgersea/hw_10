const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const render = require("./lib/htmlRenderer");

let employees = [];

function getManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is their name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?"
        },
        {
            type: "list",
            name: "teammate",
            message: "Enter another member of your team",
            choices: ["manager", "engineer", "intern", "No other members to enter"]
        }
    ]).then(function (response) {
        const {name, id, email, officeNumber} = response;
        const role = 'manager';
        let team_Member = new Manager(name, id, email, officeNumber, role);
        employees.push(team_Member);
        save_Member(response);
    });
}

function getEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's github username?"
        },
        {
            type: "list",
            name: "teammate",
            message: "Enter another member of your team",
            choices: ["manager", "engineer", "intern", "No other members to enter"]
        }
    ]).then(function (response) {
        const {name, id, email, github} = response;
        const role = 'engineer';
        let team_Member = new Engineer(name, id, email, github, role);
        employees.push(team_Member);
        save_Member(response);
    });
}

function getIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's alma mater?"
        },
        {
            type: "list",
            name: "teammate",
            message: "Enter another member of your team",
            choices: ["manager", "engineer", "intern", "No other members to enter"]
        }
    ]).then(function (response) {
        const {name, id, email, school} = response
        const role = 'intern';
        let team_Member = new Intern(name, id, email, school, role);
        employees.push(team_Member);
        save_Member(response);
    });
}

function save_Member(response) {
    if (response.teammate === "manager") {
        getManager();
    }
    else if (response.teammate === "engineer") {
        getEngineer();
    }
    else if (response.teammate === "intern") {
        getIntern();
    }
    else {
        const html = render(employees);
        const OUTPUT_DIR = path.resolve(__dirname, "output");
        const outputPath = path.join(OUTPUT_DIR, "team.html");
        writeFileAsync(outputPath, html)
            .then(function () {
                console.log("Successfully created team.html");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

getManager();
