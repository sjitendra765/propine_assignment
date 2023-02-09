# Portfolio Value Calculator

A command-line program that calculates the latest or specific date portfolio value for a crypto investor. The transactions are stored in a CSV file and the exchange rates are retrieved from the CryptoCompare API.

## Requirements
- Node.js
- npm

## Installation
1. Clone or download the repository
2. Navigate to the project directory in your terminal
3. Install the required modules by running the following command:
```npm install

## Usage
The program takes the following parameters:
1. `filePath` - the path to the CSV file that contains the transactions
2. `dateString` (optional) - a date in the format `MM/DD/YYYY` to retrieve the portfolio value for a specific date
3. `symbol` (optional) - a token symbol to retrieve the portfolio value for a specific token

To run the program, execute the following command in your terminal:
```node index.js [filePath] [dateString] [symbol]

For example, to retrieve the latest portfolio value for all tokens:
```node index.js transactions.csv

To retrieve the portfolio value for a specific date:
```node index.js transactions.csv 01/01/2022

To retrieve the portfolio value for a specific token:
```node index.js transactions.csv ETH

To retrieve the portfolio value for a specific date and token:
```node index.js transactions.csv 01/01/2022 ETH


