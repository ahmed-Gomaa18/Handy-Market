const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    signOut :[roles.Admin , roles.Customer ,roles.Seller ],
    addProduct : [roles.Seller]
}

module.exports = endPoint