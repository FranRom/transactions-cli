import { isStringANumberWithSymbol, formatNumberToString, sanitizeTransactions, getBalances, Transaction } from "./balances";
import { SANITIZE_MOCK, BAlANCES_MOCK } from './constants/mockData'

jest.mock('chalk', () => ({ red: jest.fn() }))
jest.mock('date-fns', () => {
  const originalModule = jest.requireActual('date-fns')
  return {
    __esModule: true,
    ...originalModule
  }
})

describe("Test isStringANumberWithSymbol function", () => {
  it("should return false if the argument is an empty string", () => {
    expect(isStringANumberWithSymbol('')).toBe(false);
  });
  it("should return false if the string is not a number", () => {
    expect(isStringANumberWithSymbol('normal string')).toBe(false);
  });
  it("should return false if the argument does not start with '+' or '-", () => {
    expect(isStringANumberWithSymbol('10')).toBe(false);
    expect(isStringANumberWithSymbol('*10')).toBe(false);
  });
  it("should return true if the argument starts with '+' or '-", () => {
    expect(isStringANumberWithSymbol('+10')).toBe(true);
    expect(isStringANumberWithSymbol('-10')).toBe(true);
  });
});

describe("Test formatNumberToString function", () => {
  it("should return a number with decimals type string with proper prefix symbol", () => {
    expect(formatNumberToString(1)).toBe('+1.00');
    expect(formatNumberToString(12)).toBe('+12.00');
    expect(formatNumberToString(-12)).toBe('-12.00');
  });
  it("should return a '0' is value is 0", () => {
    expect(formatNumberToString(0)).toBe('0');
  });
});

describe("Test sanitizeTransactions function", () => {
  it("should return all tx if they have all mandatory fields and correct type", () => {
    expect(sanitizeTransactions(SANITIZE_MOCK.ORIGIN_TX_DATA)).toStrictEqual(SANITIZE_MOCK.ORIGIN_TX_DATA);
  });
  it("should remove a record if it doesn't have a mandatory field", () => {
    expect(sanitizeTransactions(SANITIZE_MOCK.NO_MANDATORY_FIELD_TX).length).toBe(1);
  });
  it("should remove a record if it doesn't have correct typing", () => {
    expect(sanitizeTransactions(SANITIZE_MOCK.NO_TYPE_TX).length).toBe(1);
  });
  it("should remove a record if it doesn't have accepted currency", () => {
    expect(sanitizeTransactions(SANITIZE_MOCK.NO_ACCEPTED_CURRENCY_TX).length).toBe(1);
  });
  it("should remove a record if it doesn't have prefix symbol", () => {
    expect(sanitizeTransactions(SANITIZE_MOCK.NO_PREFIX_TX).length).toBe(1);
  });
  it("should remove a record if it doesn't have a proper amount", () => {
    expect(sanitizeTransactions(SANITIZE_MOCK.WRONG_AMOUNT_TX).length).toBe(1);
  });
  it("should remove a record if the timestamp is not valid", () => {
    expect(sanitizeTransactions(SANITIZE_MOCK.NO_TIMESTAMP_TX).length).toBe(1);
  });
});

describe("Test getBalances function", () => {
  it("should return the proper balances per user", () => {
    expect(getBalances(BAlANCES_MOCK.TX_TO_BALANCES as Transaction[])).toStrictEqual(BAlANCES_MOCK.TX_GROUPED_BY_USER);
  });
});

