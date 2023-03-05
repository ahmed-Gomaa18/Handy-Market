const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({

    product_name:{
        type: String,
        minLength: 3,
        required: true, 
        trim: true // '    ahmed     ' => 'ahmed'
    },
    photos:{    // Updated
        type: [String],
        required: true,
        validate: {
            validator: function(v){
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `Products ${props.path} must have at least one photo`
        }

    },
    description:{
        type: String,
        minLength: 20
    },
    number_of_items: {
        type: Number,
        required: true,
        default: 1
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        default: 0
    },
    sold_items:{
        type: Number,
        default: 0
    },
    sold_items_per_mounth:{
        type: Number,
        default: 0
    },
    product_approval:{
        type: Boolean,
        default: false
    },
    soft_delete:{
        type: Boolean,
        default: false
    },
    created_by: {
        type: ObjectId, // mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    categories_id: { // Under Descus // Update to be required & unique
        type: [{
            type: ObjectId,
            ref: 'Categories',
        }],
        required: true,
        validate: {
            validator: function(v){
                return Array.isArray(v) && v.length > 0;
            },
            message: props => `Product ${props.path} must have at least one of Categories id`
        }
    },
    ratings_id: {
        type: [{
            type: ObjectId,
            ref: 'Reviews',
        }]
    }

},
{
    timestamps:true
})

// Check Duolicated Name For Same Seller (ceated_by)
productSchema.pre("save" ,async function(next) {
    
    const allproducts = await Product.find({created_by: this.created_by});
    
    if(allproducts){
        let duplicatedName = allproducts.find((product)=>{
            return product.product_name == this.product_name
        })
        if (duplicatedName){
            throw Error('Poduct Name Already exist...')
        }
        else{
            next();
        }
        
    }else{
        next();
    }
      
  });

const Product = mongoose.model('Products', productSchema);


module.exports = Product;
