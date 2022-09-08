<img width="652" alt="Screenshot 2022-09-08 at 12 22 41" src="https://user-images.githubusercontent.com/32134460/189098739-6d391e40-d23a-4a7a-aa6f-09ea9ef87393.png">

# balances-cli

A command line tool that ingest a JSON file containing a list of credit/debit card transactions for a group of users, process the transactions and compute the final balances for each user.

## How it works

The JSON file must have an array of transactions, each transaction must have the following structure:

```sh
 {
  user_id: string
  timestamp: string
  currency: Currency
  amount: string
 }
```

where currency are limited to

```sh
 enum Currency {
  GBP = "GBP",
  EUR = 'EUR',
  USD = 'USD'
}
```

- If a transaction have missing or malformed data the record will be discarded logging info about it.
- Amount must be a string that contains negative or positive prefix and a number
- Timestamp must be a string with valid UTC date-time as per ISO 8601
- The maximum file size by default is 1Mb
- The only file extension accepted is `.json`

The output will have one user per line and balances for each currency

<img width="860" alt="Screenshot 2022-09-08 at 12 23 42" src="https://user-images.githubusercontent.com/32134460/189098927-738ee69e-b9a3-40c3-a418-8a1ffd229be2.png">

## Usage

`jsonPath` is a mandatory argument to run the script

```sh
balances <jsonPath>
```

### Options

<img width="723" alt="Screenshot 2022-09-08 at 12 24 35" src="https://user-images.githubusercontent.com/32134460/189099125-67622862-cfae-42a0-bc05-a35dd914811b.png">

To get help

```sh
balances --help
```

To get version

```sh
balances --version
```

To set a different max file size in Mb (default is 1)

```sh
balances --version
```

## Guetting started

1. Clone the repo

```sh
 git clone https://github.com/FranRom/transactions-cli.git
```

2. Install dependencies

```sh
 npm install
```

3. Build

```sh
 npm run build
```

4. Run the script

```sh
  node dist/index.js <path-to-JSON-file>
```

or

```sh
 npm run balances <path-to-JSON-file>
```

5. You can install the CLI locally (Optional)

```sh
  npm run local
```

so then you can run the script with

```sh
  balances <path-to-JSON-file>
```

6. To develop you can run nodemon watch

```sh
 npm run start
```

## Tests

To run the tests

```sh
 npm run test
```

To run tests in watch mode

```sh
 npm run test:watch
```

## Additional scripts

You can refresh the project with

```sh
 npm run refresh
```

This will remove node_modules and package-lock.json ending with npm install

You also can run a build + tests with

```sh
 npm run create
```
