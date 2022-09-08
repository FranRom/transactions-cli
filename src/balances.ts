import chalk from 'chalk';
import { isAfter, isValid, formatISO, parseISO } from 'date-fns'

enum Currency {
  GBP = "GBP",
  EUR = 'EUR',
  USD = 'USD'
}

export interface Transaction {
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

export interface Result {
  [userId: string]: Balance
}

export const DEFAULT_AMOUNT = '0'

export const isStringANumberWithSymbol = (str: string | undefined): boolean => {
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

export const formatNumberToString = (num: number): string => {
  const localeString = num === 0 ? String(num) : num.toLocaleString(undefined, { minimumFractionDigits: 2 })
  const numberWithSign = (num <= 0 ? '' : '+') + localeString

  return numberWithSign
}

export const sanitizeTransactions = (transactionsArray: any[]): Transaction[] | [] => {
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

export const getBalances = (transactionsArray: Transaction[]): Result => {
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
