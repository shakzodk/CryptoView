// server/models/nftModel.js
const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  contractAddress: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const nftModel = mongoose.model("Nft", nftSchema);

module.exports = nftModel;