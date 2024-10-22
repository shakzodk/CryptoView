const mongoose = require("mongoose");

const ipfsSchema = new mongoose.Schema({
  ipfsHash: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: String,
    required: true,
  },
}, { timestamps: true });     

const IpfsModel = mongoose.model("IpfsData", ipfsSchema);

module.exports = IpfsModel;