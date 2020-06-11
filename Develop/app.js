const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function promptQuestions() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?',
            validate: function(answer) {
                if (answer.length < 1) {
                    return 'Please enter valid name';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee\'s ID number?',
            validate: function(answer) {
                if (answer = NaN || answer.length < 1) {
                    return 'Please enter valid ID number';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee\'s email address?',
            validate: function(answer) {
                if (answer.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    return true;
                } else {
                    return 'Invalid email. Please enter valid email';
                };
            }
        },
        {
            type: 'rawlist',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: ['Manager', 'Engineer', 'Intern']
        }
     ])
};

const managerPrompt = {
    type: 'input',
    name: 'officeNumber',
    message: 'What is the manager\s office number?',
    validate: function(answer) {
        if (answer = NaN || answer.length < 1) {
            return 'Please enter valid office number number';
        }
        return true;
    }
};

const engineerPrompt = {
    type: 'input',
    name: 'github',
    message: 'Please enter the engineer\'s github username',
    validate: function(answer) {
        if (answer.length < 1) {
            return 'Please enter valid github username';
        }
        return true;
    }
};

const interPrompt = {
    type: 'input',
    name: 'school',
    message: 'What school does the intern attend?',
    validate: function(answer) {
        if (answer.length < 1) {
            return 'Please enter valid school';
        }
        return true;
    }
};




async function init() {
    const generalAnswers = await promptQuestions();
    const { name, id, email, role} = employeeInput;
}
