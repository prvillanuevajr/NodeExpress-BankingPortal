const express = require('express')
const router = express.Router();
const {accounts, writeJSON} = require('../data');

app.get('/transfer', async (req, res) => {
    res.render('transfer')
})

router.post('/transfer', async (req, res) => {

    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);

    writeJSON()

    res.render('transfer', {message: "Transfer Completed"})
})

router.get('/payment', async (req, res) => {
    res.render('payment', {account: accounts.credit})
})

router.post('/payment', async (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);

    writeJSON()

    res.render('payment', {message: "Payment Successful", account: accounts.credit})
})

module.exports = router