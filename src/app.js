const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf8');
const users = JSON.parse(userData);

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

    const accountsJSON = JSON.stringify(accounts)
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8')

    res.render('transfer', {message: "Transfer Completed"})
})

app.get('/payment', async (req, res) => {
    res.render('payment', {account: accounts.credit})
})

app.post('/payment', async (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);

    const accountsJSON = JSON.stringify(accounts)
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf8')

    res.render('payment', {message: "Payment Successful", account: accounts.credit})
})

app.listen(3000, function () {
    console.log('PS Project Running on port 3000!')
})