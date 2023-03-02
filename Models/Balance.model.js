const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const balanceSchema = new mongoose.Schema({
    total_profit:{
        type: Number,
        default: 0
    },
    order_id: {
        type: ObjectId,
        ref: 'Orders',
        required: true
    },
    order_profit: {
        type: Number,
        required: true
    }
    
},
{
    timestamps:true
})

const Balance = mongoose.model('Balance', balanceSchema);


module.exports = Balance;