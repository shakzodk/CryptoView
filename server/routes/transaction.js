const express = require("express");
const { getTransactionsByAddress } = require("../controllers/transactionController");

const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();

router.use(requireAuth);

router.get("/:address", getTransactionsByAddress);

module.exports = router;