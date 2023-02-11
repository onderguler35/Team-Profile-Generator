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
// the below function asks user to make a choice on which type of employee to add or not anymore. Then goes to relevant function as per the choice.
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