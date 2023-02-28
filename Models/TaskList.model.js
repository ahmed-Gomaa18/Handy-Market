const  mongoose = require("mongoose");

const Schema=mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;

const taskListSchema=new Schema(
{
    products:[{
        product_id: {
            type: ObjectId,
            ref: 'Products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    user_id:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        default:'placed',
        enum:['placed','rejected', 'received','onWay']
    },
    quantity:{
        type:Number,
        default:1
    }   
},
{
    timestamps:true
});

const Tasklist = mongoose.model("Tasklists",taskListSchema);

module.exports = Tasklist;