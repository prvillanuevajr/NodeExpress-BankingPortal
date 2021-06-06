const express = require('express')
const app = express();
const fs = require('fs')
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))


app.get('/', async (req, res) => {
    res.render('index.ejs',{title: 'Index'})
})
app.listen(3000)