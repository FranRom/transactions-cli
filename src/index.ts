#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');

// enum Currency {
//   GBP = "GBP",
//   EUR = 'EUR',
//   USD = 'USD'
// }

// interface Transaction {
//   userId: string
//   timestamp: string
//   currency: Currency
//   amount: string
// }

// interface UserBalance {
//   userId: string
//   GBP: string | null
//   EUR: string | null
//   USD: string | null
//   lastActivity: string
// }

// const getBalances = (transactionsArray: Array<Transaction>): string => {
//  return JSON.stringify(transactionsArray)
// }

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

clear();
console.log(
  chalk.red(
    figlet.textSync('transactions-cli', { horizontalLayout: 'full' })
  )
);

program
  .version('0.0.1')
  .name('transactions')
  .description('A CLI for processing transactions')
  .option('-b, --balances', 'Print the final balances per user')
  .parse(process.argv);

if (!getArgs().length) {
  program.outputHelp();
}

const options = program.opts();

if (options.balances) {
 console.log("You asked for balances with command: ", getArgs())
}
