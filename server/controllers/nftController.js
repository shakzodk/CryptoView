const fetch = require("node-fetch");
const {Web3} = require('web3')
const nftModel = require("../models/nftModel");
const nftContractABI = require("../abis/nftContractABI.json");

require("dotenv").config(); 

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_URL));

const getNFTMetadata = async (req, res) => {
  const { contractAddress, tokenId } = req.body;

  try {
    const contract = new web3.eth.Contract(nftContractABI, contractAddress);
    const metadata = await contract.methods.tokenURI(tokenId).call();

    const response = await fetch(metadata);
    const nftData = await response.json();

    const Nft = new nftModel({
      contractAddress,
      tokenId,
      name: nftData.name,
      description: nftData.description,
      image: nftData.image,
    });
    await Nft.save();

    res.status(200).json(nftData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve NFT metadata" });
  }
};

module.exports = {
  getNFTMetadata,
};