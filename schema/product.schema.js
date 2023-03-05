const productSchema = {
    type: "object",
    properties: {
        product_name: {
            type: 'string',
            minLength: 3
        },
        description: {
            type: 'string',
            minLength: 20
        },
        number_of_items: {
            type: 'integer',
            minimum: 1,
            default: 1
        },
        price: {
            type: 'number',
            minimum: 5
        },
        discount: {
            type: 'integer',
            default: 0
        },
        sold_items: {
            type: 'integer',
            default: 0
        },
        sold_items_per_mounth: {
            type: 'integer',
            default: 0
        },
        product_approval: {
            type: 'boolean',
            default: false
        },
        soft_delete: {
            type: 'boolean',
            default: false
        },
        categories_id: {
            type: 'array',
            items: {
                type: 'string',
                pattern: '^[a-z0-9]{24}$'
            },
            minItems: 1,
            uniqueItems: true
        }
    },
    required: ['product_name', 'photos', 'number_of_items', 'price', 'categories_id'],
    additionalProperties: false
}

module.exports = { productSchema };

