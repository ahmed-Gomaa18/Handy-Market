const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: create user schema
const userSchema = new Schema({
    user_name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true
    },
    full_name: String,
    email: {
      type: String,
      unique: [true, 'email must be unique value'],
      required: [true, 'email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'] // I Append That
    },
    age: {
      type: Number,
      min: 15,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
      default: 'Male'
    },
    password: {
      type: String,
      require: true
    },
    address: {
      city: String,
      street: String,
      building_num: Number,
    },
    code: String,
    phone: String,
    shop_name: String,
    description: String,
    role: {
      type: String,
      default: 'Customer',
      enum: ['Admin', 'Customer', 'Seller']
    },
    confirm_email: { 
      type: Boolean, 
      default: false
    },
    isBlocked: { 
      type: Boolean, 
      default: false 
    },
    active: { 
      type: Boolean, 
      default: false 
    },
    soft_delete: { 
      type: Boolean, 
      default: false
    },
    _Token: String,
    number_of_token: { 
      type: Number,
      max: 5,
      default: 0 
    },
    profile_image: String,
    products: [
      { 
        type: ObjectId, 
        ref: 'Products' 
      }
    ],
    favorite: [
      { 
        type : ObjectId,
        ref: 'Products'
      }
    ],
    subscription: [
      { 
        type: ObjectId,
        ref: 'Users'
      }
    ],
    whishlist: [
      { 
        type: ObjectId,
        ref: 'Products'
      }
    ],
    deActivated : {
      type: Boolean,
      default: false
    }
}, { timestamps: true });

userSchema.pre( 'save' , async function(next){

  this.password = await bcrypt.hash(this.password , parseInt(process.env.SALT_ROUND));
  next();
});

// TODO: create user model
const User = mongoose.model('Users', userSchema);

module.exports = User;
