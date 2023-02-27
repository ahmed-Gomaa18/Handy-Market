const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const ReviewSchema = new mongoose.Schema({
    message:{
        type: String,
        required: [true, 'message is required'],
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    user_id: {
        type: ObjectId,
        ref: 'Users',
        required: true
    },
    product_id: {
        type: ObjectId,
        ref: 'Products',
        required: true
    }
    

},
{
    timestamps:true
})

const Review = mongoose.model('Reviews', ReviewSchema);


module.exports = Review;