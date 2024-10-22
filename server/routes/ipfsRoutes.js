const express = require("express");
const { storeDataOnIPFS, getDataFromIPFS } = require("../controllers/ipfsController");
// const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();

// router.use(requireAuth);

router.post("/store", storeDataOnIPFS);

router.get("/retrieve/:ipfsHash", getDataFromIPFS);

module.exports = router;