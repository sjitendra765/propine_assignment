const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

// Function to retrieve exchange rate for a given token
async function getExchangeRate(token) {
  try {
    // Call CryptoCompare API to retrieve exchange rate
    const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&api_key=ea01e21882e71b3677947a1097723ef2e0bcae866580f1a115f4cf7f2b3c3ee6`);
    return response.data.USD;
  } catch (error) {
    console.error(`Failed to retrieve exchange rate for ${token}: ${error}`);
    return 0;
  }
}

// Function to calculate portfolio value
async function calculatePortfolioValue(csvPath, date, token) {
  let portfolioValue = 0;
  let exchangeRate;
  
  // Read CSV file line by line
  const rl = readline.createInterface({
    input: fs.createReadStream(csvPath)
  });

  rl.on('line', async (line) => {
    // Split line into fields
    const fields = line.split(',');
    const timestamp = parseInt(fields[0]);
    const transactionType = fields[1];
    const transactionToken = fields[2];
    const amount = parseFloat(fields[3]);

    // Check if timestamp is after the given date
    if (date && new Date(timestamp * 1000).toDateString() > new Date(date).toDateString()) {
      return;
    }

    // Check if token matches the given token
    if (token && token !== transactionToken) {
      return;
    }

    // Retrieve exchange rate for the token if necessary
    if (!exchangeRate || exchangeRateToken !== transactionToken) {
      exchangeRate = await getExchangeRate(transactionToken);
      exchangeRateToken = transactionToken;
    }

    // Add deposit or subtract withdrawal from portfolio value
    if (transactionType === 'DEPOSIT') {
      portfolioValue += amount * exchangeRate;
    } else if (transactionType === 'WITHDRAWAL') {
      portfolioValue -= amount * exchangeRate;
    }
  });

  rl.on('close', () => {
    console.log(`Portfolio value on ${date || 'latest date'} for ${token || 'all tokens'}: ${portfolioValue.toFixed(2)} USD`);
  });
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const csvPath = args[0];
  const date = args[1];
  const token = args[2];

  if (!csvPath) {
    console.error('Please provide the path to the CSV file');
    return;
  }

  await calculatePortfolioValue(csvPath, date, token);
}

// Run main function
main();
