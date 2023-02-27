const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: create order schema
const orderSchema = new Schema({
    user_id: {
        type: ObjectId,
        ref: 'Users',
        required: true
    },
    products:{
        type: [{
            product_id: {
                type: ObjectId,
                ref: 'Products'
            },
            unitPrice: Number,
            quantity: {
                type: Number,
                default: 1
            },
            // product_total_price: { // driven value 
            //     type: Number,
            //     default: 1
            // }
        }],
        validate:{
            validator: function(v){
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `Order must have at least one of ${props.path}`
        }
    },
    totalPrice: {
        type: Number,
        default: 1
    },
    phone: { 
        type: String, 
        required: [true, 'phone is required'] 
    },
    order_address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
        building_num: { type: Number, required: true }
    },
    payment_method: {
        type: String,
        default: 'Cash',
        enum: ['Cash', 'Visa']
    },
    status: { 
        type: String, 
        default: "placed",
        enum: ['placed', 'received', 'rejected', 'onWay']
    }
}, { timestamps: true });

// TODO: create order model
const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;