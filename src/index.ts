#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import path from 'path';
import { program } from 'commander';
import { Table } from 'console-table-printer';
import { readFileSync, statSync } from 'fs';
import { getBalances, sanitizeTransactions, DEFAULT_AMOUNT, Transaction, Result } from './balances'

const DEFAULT_MAX_FILE_SIZE_MEGABYTES = 1
const ACCEPTED_FILE_FORMAT = '.json'
export const FILE_TOO_LARGE_MESSAGE = 'Load failed: The file is too large, it should be 1MB max'

const getArgs = () => {
  const args = process.argv.slice(2)
  return args
}

clear();
console.log(
  chalk.red(
    figlet.textSync('balances-cli', { horizontalLayout: 'full' })
  )
);

export const calculateBalances = (jsonPath: string, maxFileSize: number) => {
  const maxFileSizeAccepted = !Number.isNaN(Number(maxFileSize)) ? Number(maxFileSize) : DEFAULT_AMOUNT
  const fileSizeInMegabytes = statSync(jsonPath).size / (1024 * 1024)
  const extension = path.extname(jsonPath)

  if (extension !== ACCEPTED_FILE_FORMAT) {
    return console.log(chalk.red("Load failed: The file must be a .json \n"))
  }
  if (fileSizeInMegabytes > maxFileSizeAccepted) {
    return console.log(chalk.red("Load failed: The file is too large, it should be 1MB max \n"))
  }
  const file = readFileSync(jsonPath, 'utf8');
  const data: Transaction[] = JSON.parse(file)
  const balances: Result = getBalances(sanitizeTransactions(data))
  printTable(balances)
}

const printTable = (balances: Result) => {
  const p = new Table();

  for (let key in balances) {
    let value = balances[key];
    p.addRow({
      'User ID': key,
      'GBP': value.GBP === DEFAULT_AMOUNT ? '-' : value.GBP,
      'EUR': value.EUR === DEFAULT_AMOUNT ? '-' : value.EUR,
      'USD': value.USD === DEFAULT_AMOUNT ? '-' : value.USD,
      'Last Activity': value.lastActivity
    })
  };

  console.log('')
  console.log(chalk.yellow('FINAL BALANCES: '))
  p.printTable()
}

program
  .version('0.0.1')
  .name('balances')
  .description('A CLI for processing transactions')
  .option('-m , --maxFileSize [maxFileSize]', 'Set the max file size to accept in Mb', String(DEFAULT_MAX_FILE_SIZE_MEGABYTES))
  .argument('<jsonPath>', 'path to load the json file with transactions')
  .action((jsonPath, { maxFileSize }) => calculateBalances(jsonPath, maxFileSize))
  .parse(process.argv);

if (!getArgs().length) {
  program.outputHelp();
}
