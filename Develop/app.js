const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array for general questions about the employee
const promptQuestions = [
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
];

//Role Specific question for a Manager Role
const managerPrompt = {
    type: 'input',
    name: 'officeNumber',
    message: 'What is the manager\'s office number?',
    validate: function(answer) {
        if (answer = NaN || answer.length < 1) {
            return 'Please enter valid office number number';
        }
        return true;
    }
};

//Role Specific question for an Engineer Role
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

// Role Specific question for an Intern Role
const internPrompt = {
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

//Question that asks if the user wants to add another employee to the team
const nextEmployeePrompt = {
    type: 'confirm',
    name: 'newEmployee',
    message: 'Would you like to add another employee to the team?'
};


const employees = [];

// Utilize async function so that process happens synchronous and you get proper information
const init = async () => {
    const generalAnswers = await inquirer.prompt(promptQuestions);
    // Utilize Object Destructuring here to unpack values from promptQuestions array
    const { name, id, email, role} = generalAnswers;

    // Conditional statement that generates specific question to user based on role answer
    if(role === 'Manager') {
        // Manager prompt if user selects role "Manager"
        const managerAnswer = await inquirer.prompt(managerPrompt);
        const officeNumber = managerAnswer.officeNumber;

        // New Constructor for Manager
        const newManager = new Manager(name, id, email, officeNumber);
        // Add the new employee to the Employees array
        employees.push(newManager);

    } else if(role === 'Engineer') {
        // Engineer prompt if user selects role "Engineer"
        const engineerAnswer = await inquirer.prompt(engineerPrompt);
        const github = engineerAnswer.github;

        // New Constructor for Engineer
        const newEngineer = new Engineer(name, id, email, github);
        // Add the new employee to the Employees array
        employees.push(newEngineer);

    }else if(role === 'Intern') {
        // Manager prompt if user selects role "Intern"
        const internAnswer = await inquirer.prompt(internPrompt);
        const school = internAnswer.school;

        // New Constructor for Intern
        const newIntern = new Intern(name, id, email, school);
        // Add the new employee to the Employees array
        employees.push(newIntern);
    }

    // Prompt user if they want to add another employee
    const nextEmployee = await inquirer.prompt(nextEmployeePrompt);
    const boolean = nextEmployee.newEmployee;
    if(boolean === true) {
        init();
    }else {
        //Calling the render function and passing through the employee array that was generated from the prompts
        const finalEmployeeList = render(employees);
        //Writing employee list to output folder where it generates the HTML template
        fs.writeFile(outputPath, finalEmployeeList, function (err) {
            if (err) {
                console.log(err);
            }
        });
    };
};

init();


