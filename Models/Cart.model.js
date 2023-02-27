const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'Users',
        require: true
    },
    products:{
        type:[{
            product_id:{
            type: ObjectId,
            ref: 'Products',
            require: true,
            },
            quantity:{
                type: Number,
                default: 1
            },
            
        }],
        validate:{
            validator: function(v){
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `Cart must have at least one of ${props.path}`
        }

    }
},
{
    timestamps:true
})

const Cart = mongoose.model('Carts', cartSchema);


module.exports = Cart;