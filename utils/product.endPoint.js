const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    product :[roles.Seller]
}

module.exports = endPoint