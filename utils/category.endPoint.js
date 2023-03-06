const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    category :[roles.Admin ]
}

module.exports = endPoint