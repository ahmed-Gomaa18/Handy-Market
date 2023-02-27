const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    signOut :[roles.Admin , roles.Customer ,roles.Seller ],
}

module.exports = endPoint