const fs = require('fs')
const path = require('path')

const accountDataPath = path.join(__dirname, 'json/accounts.json');
const accounts = JSON.parse(fs.readFileSync(accountDataPath, 'utf8'))
const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'json/users.json'), 'utf8'))

const writeJson = () => {
    fs.writeFileSync(accountDataPath, JSON.stringify(accounts));
}

module.exports = {
    accounts,
    users,
    writeJson
}