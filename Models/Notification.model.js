const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const notificationSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    notify: {
        type: Boolean,
        default: true
    },
    is_deleted:{
        type: Boolean,
        default: false
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

const Notification = mongoose.model('Notifications', notificationSchema);


module.exports = Notification;