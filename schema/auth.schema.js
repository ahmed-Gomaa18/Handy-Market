
  const singUpSchema = {
    type: "object",
    properties: {
      user_name: {type: "string",maxLength:20 ,minLength:3},
      email: {type: 'string', format: 'email'},
      age: {type: "number", minimum: 15},
      gender:{type:"string" ,enum: ['Male', 'Female']},
      role:{type:"string" ,enum: ['Admin', 'Customer', 'Seller']},
      password:{type: "string",pattern:'^[A-Z][1-9]{2,5}$'},
      phone:{type:"string" , maxLength: 11 ,minLength:11} ,
      address:{
        type:"object",
        properties:{
            city: {type:"string"},
            street: {type:"string"},
            building_num:{type:"number"},
        },
        required:["city" , "street" , "building_num"]
      }

    },
    required: ["user_name" ,"email" , "age" , "gender" , "password" , "role"],
    additionalProperties: false
  }


  const sellerSignUpSchema  = {
    type: "object",
    properties: {
      user_name: {type: "string",maxLength:20 ,minLength:3},
      email: {type: 'string', format: 'email'},
      age: {type: "number", minimum: 15},
      gender:{type:"string" ,enum: ['Male', 'Female']},
      role:{type:"string" ,enum: ['Admin', 'Customer', 'Seller']},
      password:{type: "string",pattern:'^[A-Z][1-9]{2,5}$'},
      phone:{type:"string" , maxLength: 11 ,minLength:11} ,
      address:{
        type:"object",
        properties:{
            city: {type:"string"},
            street: {type:"string"},
            building_num: {type:"number"},
      
        },
        required:["city" , "street" , " building_num"]
      },
      full_name:{type:"string"},
      shop_name:{type: "string",maxLength:20 ,minLength:3},
      description:{type: "string",maxLength:50 ,minLength:15}

    },
    required: ["user_name" ,"email" , "age" , "gender" , "password" , "role" ," full_name" ,"shop_name" ,"description" ,"address" , "phone"],
    additionalProperties: false
  }

 module.exports = {
    singUpSchema,
    sellerSignUpSchema
};