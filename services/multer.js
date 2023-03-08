const multer = require('multer');
const fs = require('fs')
const path = require('path')

const multerPath = {

    profilePic:'users/profile/pacture' ,
    product:'product'
}

const multerValidators = {
    image:['image/jpg' , 'image/gif' , 'image/jpeg' , 'image/png'] ,
    pdf:['application/pdf']
}

const HMR = (err , req , res , next)=>{
    if(err){
        res.status(400).json({mesage:"Multer Error" , err});
    }else {
        next()
    }
}

function myMulter(customPath , customValidator) {
    
    if (!customPath || customPath == null) {
        customPath = 'general'
    }
    const fullPath = path.join(__dirname , `../uploads/${customPath}`);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath , {recursive:true})
    }

    const storage = multer.diskStorage({

        destination: function (req , file , cb) {
            req.finalDestination = `/uploads/${customPath}`
            cb( null , fullPath);
        },
        filename: function( req , file , cb){
            cb(null , Date.now() + "_" + file.originalname )
        }
    })

    const fileFilter = function (req , file , cb){

        if(customValidator.includes(file.mimetype)){
            cb(null , true)
        }else{
         req.fileErr = true
         cb(null , false)
        }
    }
                                                // add 00 to file size
   const upload = multer({dest:fullPath ,limits:{fileSize: 62500000} , fileFilter , storage })
   return upload ;
}

module.exports = {
    myMulter ,
    multerPath ,
    multerValidators , 
    HMR
}