const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData)
const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData)

app.get('/', async (req, res) => {
    res.render('index', {title: 'Account Summary', accounts})
})

app.get('/savings', async (req, res) => {
    res.render('summary', {account: accounts.savings})
})

app.get('/credit', async (req, res) => {
    res.render('summary', {account: accounts.credit})
})

app.get('/checking', async (req, res) => {
    res.render('summary', {account: accounts.checking})
})

app.get('/profile', async (req, res) => {
    res.render('profile', {user: users[0]})
})

app.listen(3000, function () {
    console.log('PS Project Running on port 3000!')
})