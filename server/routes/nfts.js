const express = require("express");
const { getNFTMetadata } = require("../controllers/nftController");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();

router.use(requireAuth);

router.post("/metadata", getNFTMetadata);

module.exports = router;