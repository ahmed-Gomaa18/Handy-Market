
const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    user :[roles.Customer ,roles.Admin,roles.Seller],
    customer:[roles.Customer]
}

module.exports = endPoint