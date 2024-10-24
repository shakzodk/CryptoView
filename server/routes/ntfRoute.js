const express = require("express");
const {
  getNftData,
  getTransactions,
  getTokenBalance,
  getTransactionsSearch,
} = require("../controllers/nftController.js");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();

// router.use(requireAuth);

router.get("/", getNftData);
router.get("/getTransactionsTracking", getTransactions);
router.get("/getTransactionsSearch", getTransactionsSearch);

router.get("/getTokenBalance", getTokenBalance);

module.exports = router;