const {roles} = require('../MiddleWare/auth.md')

const endPoint = {
    admin : [roles.Admin],

}

module.exports = endPoint