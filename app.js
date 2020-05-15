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
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?"
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
        const {name, id, email} = response
        const role = 'manager';
        let manager = new Manager(name, id, email, role);
        employees.push(manager);

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
        }
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
        const {name, id, email, github} = response
        const role = 'engineer';
        let engineer = new Engineer(name, id, email, github, role);
        employees.push(engineer);

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
           console.log(html)
           const OUTPUT_DIR = path.resolve(__dirname, "output");
           const outputPath = path.join(OUTPUT_DIR, "team.html");
        }
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
        let intern = new Intern(name, id, email, school, role);
        employees.push(intern);

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
        }
    });
}

getManager();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
