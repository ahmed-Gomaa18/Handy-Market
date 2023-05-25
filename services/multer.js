const multer = require('multer');

const HMR = (err , req , res , next)=>{
    if(err){
        res.status(400).json({mesage:"Multer Error: " + err.message});
    }else {
        next()
    }
}

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024, // 3MB limit
    },
})

module.exports = {
    upload ,
    HMR
}