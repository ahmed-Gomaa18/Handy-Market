const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    balance :[roles.Admin ]
}

module.exports = endPoint