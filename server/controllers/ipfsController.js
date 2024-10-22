const https = require('https');
const IpfsModel = require("../models/ipfsModel");
require("dotenv").config();

// Function to store data on IPFS
const storeDataOnIPFS = (req, res) => {
  const { data } = req.body;

  const options = {
    hostname: 'ipfs.infura.io',
    port: 5001,
    path: '/api/v0/add',
    method: 'POST',
    auth: process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_PROJECT_SECRET,
  };

  const reqIPFS = https.request(options, (response) => {
    let body = '';

    response.on('data', (chunk) => {
      body += chunk;
    });

    response.on('end', async () => {
      const ipfsResponse = JSON.parse(body);
      const ipfsHash = ipfsResponse.Hash;

      // Save IPFS hash and data in MongoDB
      const ipfsData = new IpfsModel({ ipfsHash, data });
      await ipfsData.save();

      res.status(200).json({ ipfsHash });
    });
  });

  reqIPFS.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: "Failed to store data on IPFS" });
  });

  // Write data to request body
  reqIPFS.write(JSON.stringify({ path: 'data.txt', content: data }));
  reqIPFS.end();
};

// Function to retrieve data from IPFS using the hash
const getDataFromIPFS = async (req, res) => {
  const { ipfsHash } = req.params;

  try {
    // Retrieve data from MongoDB
    const ipfsData = await IpfsModel.findOne({ ipfsHash });

    if (!ipfsData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({ data: ipfsData.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve data from IPFS" });
  }
};

module.exports = {
  storeDataOnIPFS,
  getDataFromIPFS,
};