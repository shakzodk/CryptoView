const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  blockNumber: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = TransactionModel;