const System = require('../Models/System.model');


let createPrecentage = (req, res)=>{
    let newPrecentage = new System({...req.body});
    newPrecentage.save()
    .then(()=>{
        res.status(200).json({message: 'created Precentage SuccessFully', newPrecentage})
    })
    .catch((err)=>{
        res.status(400).json({message: 'Catch Error : ' + err.message})
    })
}

let updatePrecentage = async (req, res)=>{
    
    try{
    
        let precentage = await System.findOneAndUpdate(req.params['id'], {...req.body});
        if(precentage){
            res.status(200).json({message: 'Precentage Updated Successfully'});
        }else{
            res.status(400).json({message: 'Maybe Some Wrong is Happen. '});
        }
    
    }
    catch(err){

        res.status(400).json({message: 'Catch Error : ' + err.message});

    }
     
}

module.exports = {
    createPrecentage,
    updatePrecentage
}
