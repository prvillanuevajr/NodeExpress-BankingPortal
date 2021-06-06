const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path')
const {writeJSON,accounts,users} = require('./data')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())



app.get('/', async (req, res) => {
    res.render('index', {title: 'Account Summary', accounts})
})

app.get('/savings', async (req, res) => {
    res.render('account', {account: accounts.savings})
})

app.get('/credit', async (req, res) => {
    res.render('account', {account: accounts.credit})
})

app.get('/checking', async (req, res) => {
    res.render('account', {account: accounts.checking})
})

app.get('/profile', async (req, res) => {
    res.render('profile', {user: users[0]})
})

app.get('/transfer', async (req, res) => {
    res.render('transfer')
})

app.post('/transfer', async (req, res) => {

    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);

    writeJSON()

    res.render('transfer', {message: "Transfer Completed"})
})

app.get('/payment', async (req, res) => {
    res.render('payment', {account: accounts.credit})
})

app.post('/payment', async (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);

    writeJSON()

    res.render('payment', {message: "Payment Successful", account: accounts.credit})
})

app.listen(3000, function () {
    console.log('PS Project Running on port 3000!')
})