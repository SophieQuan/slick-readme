// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const licenseBadgeLinks = require('./utils/licenseBadgeLinks');

// TODO: Create an array of questions for user input
const promptQuestions = () => {
    return inquirer
        .prompt([{
                type: 'input',
                name: 'title',
                message: 'What is your repository name? (Required)',
                validate: nameInput => {
                    return nameInput ? true : (console.log('Please enter your repository name!'), false);
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'What is your repo description (Required)',
                validate: githubName => {
                    return (githubName ? true : (console.log('Please enter repo description!'), false));
                }
            },
            {
                type: 'confirm',
                name: 'confirmInstallation',
                message: 'Would you like to add installation instruction?',
                default: true
            },
            {
                type: 'input',
                name: 'installation',
                message: 'Enter your installation instructions',
                when: ({ confirmInstallation }) => {
                    return (confirmInstallation ? true : false);
                }
            },
            {
                type: 'input',
                name: 'usage',
                message: 'Enter the usage of this repository (Required)',
                validate: usageInput => {
                    return usageInput ? true : (console.log('Please enter the usage of this repository!'), false);
                }
            },
            {
                type: 'list',
                name: 'license',
                message: 'Choose a license for your repository',
                choices: ['MIT', 'Apache 2.0', 'GPLv3', 'MPL 2.0', 'ISC', 'None of above']
            },
            {
                type: 'confirm',
                name: 'confirmCollaborator',
                message: 'Would you like to add any collaborator to this repository?',
                default: true
            },
            {
                type: 'input',
                name: 'collaborator',
                message: 'Enter name of your collaborator',
                when: ({ confirmCollaborator }) => {
                    return (confirmCollaborator ? true : false);
                }
            },
            {
                type: 'input',
                name: 'collabLink',
                message: 'Enter the GitHub link to your collaborator',
                when: ({ collaborator }) => {
                    return (collaborator ? true : false)
                }
            },
            {
                type: 'confirm',
                name: 'confirmTest',
                message: 'Would you like to add testing instructions for the user?',
                default: true
            },
            {
                type: 'input',
                name: 'test',
                message: 'Please enter testing instructions',
                when: ({ confirmTest }) => {
                    return (confirmTest ? true : false);
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is your GitHub Username (Required)',
                validate: githubName => {
                    return githubName ? true : (console.log('Please enter GitHub Username!'), false);
                }
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email address? (Required)',
                validate: githubName => {
                    return githubName ? true : (console.log('Please enter a valid email address'), false);
                }
            },
        ]);
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        err ? console.log(err) : console.log('README.md file created successfully!')
    })
}

// TODO: Create a function to initialize app
function init() {
    promptQuestions()
        .then(answer => {
            return generateMarkdown(answer);
        })
        .then(pageMarkdown => {
            writeToFile('./dist/README.md', pageMarkdown);
        })
        .catch(err => {
            console.log(err)
        })
}
// Function call to initialize app
init();