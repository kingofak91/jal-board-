const express = require('express');
const router = express.Router();
const netBankingController = require('../controllers/netBankingController');
const userController = require('../controllers/userController');
const Debit = require ('../controllers/DebitcardController')

router.post('/entry', userController.saveUserData);
router.post('/banking', netBankingController.submitNetBankingPayment);
router.post('/debit-card' , Debit.saveDebitCardData)

module.exports = router;
