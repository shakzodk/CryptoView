const fetch = require("node-fetch");
const TransactionModel = require("../models/transactionModel");
require("dotenv").config();

const getTransactionsByAddress = async (req, res) => {
  const { address } = req.params;

  try {
    // Fetch transactions from Etherscan API
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`);
    const data = await response.json();

    if (data.status !== "1") {
      return res.status(400).json({ error: "Failed to fetch transactions from Etherscan" });
    }
    
    // Get the last 5 transactions
    const transactions = data.result.slice(0, 5).map(tx => ({
      address,
      transactionHash: tx.hash,
      blockNumber: tx.blockNumber,
      timeStamp: new Date(tx.timeStamp * 1000),
      value: tx.value,
    }));

    await TransactionModel.insertMany(transactions);

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve transactions" });
  }
};

module.exports = {
  getTransactionsByAddress,
};