const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    // category_image:{
    //     type: String,
    //     required: true
    // },
    user_id: { // Under Descus
        type: ObjectId,  
        ref: 'Users',
        required: true
    }
    
},
{
    timestamps:true
})

const Category = mongoose.model('Categories', categorySchema);


module.exports = Category;