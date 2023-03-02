
const createOrderSchema = {
    type: "object",
    properties: {
      products:{
        type: 'array',
        items: {
           type:"object",
           properties:{
            product_id:{
                type: 'string',
              pattern: '^[a-z0-9]{24}$'
            },
            unitPrice:{type:"number"},
            quantity:{
                type:"number"
            }
           }
        }
      },
      phone:{type:"string" , maxLength: 11 ,minLength:11} ,
      order_address:{
        type:"object",
        properties:{
            city: {type:"string"},
            street: {type:"string"},
            building_num:{type:"number"}
        },
        required:["city" , "street" , "building_num"]
      },
      payment_method:{
        type:"string" ,
        enum: ['Cash', 'Visa'],
      }
    },
    required: ["order_address" , "products" , "phone"  , "payment_method"],
    additionalProperties: false
}





module.exports = {
    createOrderSchema ,
};

