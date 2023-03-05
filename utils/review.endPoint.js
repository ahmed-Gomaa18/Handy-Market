const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    review :[roles.Customer]
}

module.exports = endPoint