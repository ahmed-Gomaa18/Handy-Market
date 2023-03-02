const productInfoSchema = {
    type: "object",
    properties: {
        product_id: { type: "string", pattern: '^[a-z0-9]{24}$' },
        quantity: { type: "integer", minimum: 1, default: 1 }
    },
    "required": ['product_id']
}

const cartSchema = {
    type: "object",
    properties: {
        user_id: {
            type: 'string',
            pattern: '^[a-z0-9]{24}$'
        },
        products: {
            type:"array",
            items: productInfoSchema
        }
    },
    required: ['user_id', 'products'],
    additionalProperties: false
}

module.exports = { cartSchema };

