const reviewSchema = {
    type: "object",
    properties: {
        message: {type: "string"},
        product_id: {
            type: 'string',
          pattern: '^[a-z0-9]{24}$'
        },
    },
    required: ["message", "product_id"],
    additionalProperties: false
}

const ratingSchema = {
    type: "object",
    properties: {
        rating: {type: "number", maximum:5, minimum: 1},
        product_id: {
            type: 'string',
          pattern: '^[a-z0-9]{24}$'
        },
    },
    required: ["rating", "product_id"],
    additionalProperties: false
}

module.exports = {
    reviewSchema,
    ratingSchema
}


