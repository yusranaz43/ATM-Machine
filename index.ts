#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000;
let myPin = 3406;

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: "Enter your pin",
    type: "number",
  },
]);

if (pinAnswer.pin === myPin) {
  console.log(chalk.green("Correct pin!!"));

  let operationAns = await inquirer.prompt([
    {
      name: "Operation",
      message: "Please select option",
      type: "list",
      choices: ["Withdraw", "Check Balance", "Fast Cash", "Exit"], // Added fast cash and exit option
    },
  ]);

  if (operationAns.Operation === "Withdraw") {
    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter your amount",
        type: "number",
      },
    ]);

    if (amountAns.amount > myBalance) {
      console.log(chalk.red("Insufficient balance")); // If amount is greater than the actual balance then program will show insufficient balance
    } else {
      myBalance -= amountAns.amount;
      console.log(chalk.green("Your remaining balance is: ") + myBalance);
    }
  } else if (operationAns.Operation === "Check Balance") {
    console.log(chalk.green(`Your balance is: ${myBalance}`)); // Template Literals
  } else if (operationAns.Operation === "Fast Cash") {
    let fastCashOptions = await inquirer.prompt([
      {
        name: "amount",
        message: "Select an amount for Fast Cash",
        type: "list",
        choices: [1000, 2000, 3000, 5000],
      },
    ]);

    myBalance -= fastCashOptions.amount;
    console.log(chalk.green("Your remaining balance is: ") + myBalance);
  } else if (operationAns.Operation === "Exit") {
    console.log(chalk.yellow("Thank you for using the ATM. Goodbye!"));
    process.exit(); // Exit the program
  }
  
} else {
  console.log(chalk.red("Incorrect pin"));
}
