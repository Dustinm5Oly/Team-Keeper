

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const fs = require('fs'); 
const inquirer = require('inquirer');

const path = require("path");
const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join (DIST_DIR, "index.html");
const generateHTML = require('./src/generateHTML');

const teamMembers=[];

const idArray = [];

console.log("Welcome to the team generator, follow the instructions to build your team!")

function teamBuilder(){
    function addManager (){
        inquirer.prompt ([
            {
                type: `input`,
                name: `managerName`,
                message: `Please enter the name of the Manager!`,
                validate: (answer) => {
                    if (answer !== ""){
                        return true;
                    }
                    return "Please enter your managers name.";
                }
            },
            {
                type: `input`,
                name: `managerId`,
                message: `Please enter the managers ID.`,
                validate: (answer) =>{
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass){
                        return true;
                    } 
                        return "Please enter a positive number greater than 0.";
                }
            },
            {
                type: `input`,
                name: `managerEmail`,
                message: `Please enter the managers Email.`,
                validate: (answer) =>{
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass){
                        return true;
                    } 
                        return "Please enter a valid email address.";
                }   
            },
            {
                type: `input`,
                name: `managerOfficeNumber`,
                message: `Please enter the managers Office Number.`,
                validate: (answer) =>{
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass){
                        return true;
                    } 
                        return "Please enter a valid Office Number.";
                }
            },
        ])
        .then ((answers) => {
            const manager = new Manager (
                answers.managerName, 
                answers.managerId, 
                answers.managerEmail, 
                answers.managerOfficeNumber,
            );
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        })
    }
    function createTeam(){
        inquirer.prompt([
            {
                type:`list`,
                name: `selection`,
                message: `Would you like to add another team member?`,
                choices: [`Engineer`,`Intern`,`I don't want to add additional team members`],

            }
        ]) 
        .then ((userChoice) =>{
            switch(userChoice.selection){
                case "Manager":
                    addManager();
                    break;
                case "Engineer": 
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    generatePage();
            }
        })
    }
    function addEngineer(){
        inquirer.prompt ([
            {
                type: `input`,
                name: `engineerName`,
                message: `Please enter the Engineer's name!`,
                validate: (answer) => {
                    if (answer !== ""){
                        return true;
                    }
                    return "Please enter the name of the Engineer.";
                }
            },
            {
                type: `input`,
                name: `engineerId`,
                message: `Please enter the Engineer's ID.`,
                validate: (answer) =>{
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass){
                        return true;
                    } 
                        return "Please enter a positive number greater than 0.";
                }
            },
            {
                type: `input`,
                name: `engineerEmail`,
                message: `Please enter the Engineer's Email.`,
                validate: (answer) =>{
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass){
                        return true;
                    } 
                        return "Please enter a valid email address.";
                }   
            },
            {
                type: `input`,
                name: `engineerGitHub`,
                message: `Please enter the Engineer's GitHub username.`,
                validate: (answer) =>{
                    if (answer !== ""){
                        return true;
                    }
                    return "Please enter a valid GitHub username.";
                }
            }, 
        ])
        .then ((answers) => {
            const engineer = new Engineer (
                answers.engineerName, 
                answers.engineerId, 
                answers.engineerEmail, 
                answers.engineerGitHub,
            );
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        })
    }
        function addIntern(){
            inquirer.prompt ([
                {
                    type: `input`,
                    name: `internName`,
                    message: `Please enter the Intern's name!`,
                    validate: (answer) => {
                        if (answer !== ""){
                            return true;
                        }
                        return "Please enter the name of the Intern.";
                    }
                },
                {
                    type: `input`,
                    name: `internId`,
                    message: `Please enter the Intern's ID.`,
                    validate: (answer) =>{
                        const pass = answer.match(/^[1-9]\d*$/);
                        if (pass){
                            return true;
                        } 
                            return "Please enter a positive number greater than 0.";
                    }
                },
                {
                    type: `input`,
                    name: `internEmail`,
                    message: `Please enter the Intern's Email.`,
                    validate: (answer) =>{
                        const pass = answer.match(/\S+@\S+\.\S+/);
                        if (pass){
                            return true;
                        } 
                            return "Please enter a valid email address.";
                    }   
                },
                {
                    type: `input`,
                    name: `internSchool`,
                    message: `Please enter the name of the school the Intern is from.`,
                    validate: (answer) =>{
                        if (answer !== ""){
                            return true;
                        }
                        return "Please enter a valid School name.";
                    }
                }, 
            ])
            .then ((answers) => {
                const intern = new Intern (
                    answers.internName, 
                    answers.internId, 
                    answers.internEmail, 
                    answers.internSchool,
                );
                teamMembers.push(intern);
                idArray.push(answers.internId);
                createTeam();
            })
    } addManager();
}

function generatePage() {
    console.log("Your team has been established!")
    fs.writeFileSync(distPath, generateHTML(teamMembers, idArray), "utf-8")
}

teamBuilder();




