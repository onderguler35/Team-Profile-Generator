// import necessary files and variables using require
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//assign the location of the folder to create the html. Files also created manually.
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// we will add created profiles to our array below. It starts as an empty array.
const profileArr = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// function to start the app
function init() {
  promptManager();
}
//app starts by asking information about the manager to create its account first.
function promptManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "Please enter the manager's name?",
      },

      {
        type: "input",
        name: "managerId",
        message: "Please enter the manager's employee ID number?",
      },

      {
        type: "input",
        name: "managerEmail",
        message: "Please enter the manager's email address?",
      },

      {
        type: "input",
        name: "managerOfficeNr",
        message: "Please enter the manager's office number?",
      },
    ])
    .then(function (data) {
      const manager = new Manager(
        data.managerName,
        data.managerId,
        data.managerEmail,
        data.managerOfficeNr
      );
      profileArr.push(manager);
      selectProfile();
    });
}
// the below function asks user to make a choice on which type of employee to add or not anymore. Then goes to relevant function as per the choice. If the user selects not to add anymore, it sends the gathered array to renderHtml function to create the output page html.
function selectProfile() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee profile would you like to create?",
        name: "employeeType",
        choices: ["Engineer", "Intern", "Do not create anymore profiles"],
      },
    ])
    .then(function (data) {
      if (data.employeeType === "Engineer") {
        promptEngineer();
      } else if (data.employeeType === "Intern") {
        promptIntern();
      } else renderHtml();
    });
}
// using inquirer to get the info for the engineer empoyee object and adding it to our array once complete. And then sending back to select menu to give option to the user to enter more employees to the team and select which type.
function promptEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Please enter the engineer's name?",
      },

      {
        type: "input",
        name: "engineerId",
        message: "Please enter the engineer's employee ID number?",
      },

      {
        type: "input",
        name: "engineerEmail",
        message: "Please enter the engineer's email address?",
      },

      {
        type: "input",
        name: "engineerGithub",
        message: "Please enter the engineer's GitHub username?",
      },
    ])
    .then(function (data) {
      const engineer = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerGithub
      );
      profileArr.push(engineer);
      selectProfile();
    });
}
// using inquirer to get the info for the intern type empoyee object and adding it to our array once complete. And then sending back to select menu to give option to the user to enter more employees to the team and select which type.
function promptIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "Please enter the intern's name?",
      },

      {
        type: "input",
        name: "internId",
        message: "Please enter the intern employee ID number?",
      },

      {
        type: "input",
        name: "internEmail",
        message: "Please enter the intern's email address?",
      },

      {
        type: "input",
        name: "schoolName",
        message: "Please enter the school the intern attends?",
      },
    ])
    .then(function (data) {
      const intern = new Intern(
        data.internName,
        data.internId,
        data.internEmail,
        data.schoolName
      );
      profileArr.push(intern);
      selectProfile();
    });
}

function renderHtml() {
  fs.writeFileSync(outputPath, renderPage(profileArr), "UTF-8");
  console.log("Thank you! All profiles created!");
}

init();
