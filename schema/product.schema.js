const createProduct = {
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
    required: ['product_name', 'number_of_items', 'price', 'categories_id', 'description'],
    additionalProperties: false
}

const updateProduct = {
    type: "object",
    properties: {
        product_name: {
            type: 'string',
            minLength: 3
        },
        photos: {
            type: 'array',
            items: {
                "type": "string"
            },
            minItems: 1,
            maxItems: 5,
            uniqueItems: true
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
        created_by: {
            type: 'string',
            pattern: '^[a-z0-9]{24}$'
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
    required: [],
    additionalProperties: false
}

module.exports = { createProduct, updateProduct};

