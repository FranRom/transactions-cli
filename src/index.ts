#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const program = require('commander');
const { Table } = require('console-table-printer');
import { readFileSync, statSync } from 'fs';
import { isAfter, isValid, formatISO, parseISO } from 'date-fns'

enum Currency {
  GBP = "GBP",
  EUR = 'EUR',
  USD = 'USD'
}

interface Transaction {
  user_id: string
  timestamp: string
  currency: Currency
  amount: string
}

interface Balance {
  GBP: string
  EUR: string
  USD: string
  lastActivity: string
}

interface Result {
  [userId: string]: Balance
}

const DEFAULT_AMOUNT = '0'
const MAX_FILE_SIZE_MEGABYTES = 1
const ACCEPTED_FILE_FORMAT = '.json'

const isStringANumberWithSymbol = (str: string | undefined): boolean => {
  if (typeof str !== 'string') {
    return false;
  }

  if (str.trim() === '') {
    return false;
  }

  if (str.startsWith('+') || str.startsWith('-')) {
    return !Number.isNaN(Number(str));
  } else {
    return false
  }
}

const formatNumberToString = (num: number): string => {
  const localeString = num === 0 ? String(num) : num.toLocaleString(undefined, { minimumFractionDigits: 2 })
  const numberWithSign = (num <= 0 ? '' : '+') + localeString

  return numberWithSign
}

const sanitizeTransactions = (transactionsArray: any[]): Transaction[] | [] => {
  const filteredArray = transactionsArray.filter((tx) => {
    const mandatoryFields = tx.user_id && tx.timestamp && tx.currency && tx.amount
    const mandatoryTypes = typeof tx.user_id === 'string' && typeof tx.timestamp === 'string' && typeof tx.currency === 'string' && typeof tx.amount === 'string'
    const currencyTypes = tx.currency === Currency.GBP || tx.currency === Currency.EUR || tx.currency === Currency.USD
    const isValidTimestamp = tx.timestamp && isValid(new Date(tx.timestamp))
    const isValidAmount = isStringANumberWithSymbol(tx.amount)

    if (!mandatoryFields || !mandatoryTypes || !currencyTypes || !isValidTimestamp || !isValidAmount) {
      console.log(chalk.red("A record was discard due to wrong structure: \n", JSON.stringify(tx)))
    }
    return mandatoryFields && mandatoryTypes && currencyTypes && isValidTimestamp && isValidAmount
  })

  return filteredArray
}

const getBalances = (transactionsArray: Transaction[]): Result => {
  const txGroupByUser = transactionsArray.reduce<Result>((acc, obj) => {
    let groupByUser = acc[obj.user_id]
    if (groupByUser) {
      const formattedAmount = formatNumberToString(parseFloat(obj.amount))
      console.log("Adding ", formattedAmount, obj.currency, ' to user ID: ', obj.user_id)
      groupByUser[obj.currency] = formatNumberToString(parseFloat(groupByUser[obj.currency]) + parseFloat(obj.amount))

      const currentLastActivity = parseISO(groupByUser.lastActivity)
      const newDate = parseISO(obj.timestamp)
      if (isAfter(newDate, currentLastActivity)) {
        const newLastActivity = formatISO(newDate, { representation: 'date' })
        groupByUser.lastActivity = newLastActivity
      }
    } else {
      const newGroupByUser = {
        GBP: DEFAULT_AMOUNT,
        EUR: DEFAULT_AMOUNT,
        USD: DEFAULT_AMOUNT,
        lastActivity: formatISO(parseISO(obj.timestamp), { representation: 'date' })
      }

      newGroupByUser[obj.currency] = formatNumberToString(parseFloat(obj.amount))
      console.log('Adding new user: \nID:', obj.user_id, JSON.stringify(newGroupByUser))
      acc[obj.user_id] = newGroupByUser
    }

    return acc
  }, {})

  return txGroupByUser
}

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
  .argument('<jsonPath>', 'path to load the json file with transactions')
  .action((jsonPath: string) => {
    const fileSizeInMegabytes = statSync(jsonPath).size / (1024 * 1024)
    const extension = path.extname(jsonPath)
    if (extension !== ACCEPTED_FILE_FORMAT) {
      return console.log(chalk.red("Load failed: The file must be a .json \n"))
    }
    if (fileSizeInMegabytes > MAX_FILE_SIZE_MEGABYTES) {
      return console.log(chalk.red("Load failed: The file is too large, it should be 1MB max \n"))
    }
    const file = readFileSync(jsonPath, 'utf8');
    const data: Transaction[] = JSON.parse(file)
    const balances: Result = getBalances(sanitizeTransactions(data))
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
  })
  .parse(process.argv);

if (!getArgs().length) {
  program.outputHelp();
}
