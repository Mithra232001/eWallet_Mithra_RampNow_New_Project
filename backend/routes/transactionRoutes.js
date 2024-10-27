const transactionController = require("./../controllers/transactionController");
const express = require('express');
const router = express.Router();

//routes
router.post('/transaction', transactionController.createTransaction);
router.get('/transaction', transactionController.getTransaction);


module.exports = router;