const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const systemSchema = new mongoose.Schema({
    precentage: {
        type: Number,
        default: 10
    },
    user_id: {
        type: ObjectId,
        ref: 'Users',
        required: true
    },

},
{
    timestamps:true
})

const System = mongoose.model('System', systemSchema);


module.exports = System;