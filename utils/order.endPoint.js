const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    order :[roles.Customer ]
}

module.exports = endPoint