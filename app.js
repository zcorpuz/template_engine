const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./Develop/lib/htmlRenderer");
​
const questions

function promptQuestions() {
    inquirer
        .prompt([
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
    .then(function(answers) {
        console.log(answers);
    }); 
};

promptQuestions();
​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
