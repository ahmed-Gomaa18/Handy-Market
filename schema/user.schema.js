const updatePasswordUserSchema = {
    type: "object",
    properties: {

        newPassword: { type: "string", pattern: '^[A-Z][1-9]{2,5}$' },
        confirmPassword: {
            type: "string",
             const: {
                $data: "1/password"
            }
        },
    },
    required: [],
    additionalProperties: false

};
const updateUserSchema = {
    type: "object",
    properties: {

        user_name: { type: "string", maxLength: 20, minLength: 3 },
        fullname: { type: "string" },
        phone: { type: "string", maxLength: 11, minLength: 11 },
        address: {
            type: "object",
            properties: {
                city: { type: "string" },
                street: { type: "string" },
                building_num: { type: "number" }
            },
            required: ["city", "street", "building_num"]
        },
        shop_name: { type: "string", maxLength: 20, minLength: 3 },
    },
    required: [],
    additionalProperties: false

};



module.exports = {
    updatePasswordUserSchema,
    updateUserSchema 
}