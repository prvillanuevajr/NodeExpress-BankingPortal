const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path')
const {writeJSON,accounts,users} = require('./data')
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())

app.use('/account',accountRoutes)
app.use('/services',servicesRoutes)



app.get('/', async (req, res) => {
    res.render('index', {title: 'Account Summary', accounts})
})

app.get('/profile', async (req, res) => {
    res.render('profile', {user: users[0]})
})

app.listen(3000, function () {
    console.log('PS Project Running on port 3000!')
})