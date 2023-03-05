const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const ReviewSchema = new mongoose.Schema({
    message:{
        type: String,
        //required: [true, 'message is required'],
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
    //    default: 1
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

// Cant Update Rating Over 5 Or Less than 0
// ReviewSchema.pre('findOneAndUpdate' ,async function(next) {
//     if(this._update.rating > 5 || this._update.rating < 1){
//         throw Error('Cant Update Review Greater Than 5 Or Less Than 0')
//     }else{
//         next()
//     }
      
// });
const Review = mongoose.model('Reviews', ReviewSchema);


module.exports = Review;