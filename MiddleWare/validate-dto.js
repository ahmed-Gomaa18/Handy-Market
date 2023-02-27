

function validateDto(ajvValidate) {
    return (req, res, next) => {
      try {
        const valid = ajvValidate(req.body);
        if (!valid){
          const errors = ajvValidate.errors;
          res.status(400).json(errors);
        }else{
            next();
        }
      } catch (error) {
        res.status(500).json({message:"Catch Error Validate Middel" , error});
      }
    };
  };
  
  module.exports = validateDto;
  