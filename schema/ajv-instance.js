const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajvInstance = new Ajv({allErrors: true , $data: true}); // options can be passed, e.g. 
addFormats(ajvInstance);


module.exports = ajvInstance;
