const express = require('express');
const router = express.Router();

const {auth} = require('../MiddleWare/auth.md');
const balanceEndPoint = require('../utils/balance.endPoint');

const balanceController = require('../Controllers/balance.controller');


router.get('/',auth(balanceEndPoint.balance),  balanceController.allBalance);

router.get('/:id',auth(balanceEndPoint.balance),  balanceController.getBalanceByID);


module.exports = router;