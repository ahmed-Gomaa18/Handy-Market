const User = require("../Models/User.model");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');


const getUserProfile = async (req, res)=>{
    try{
        const { _id } = req.user;
        const user = await User.findById({_id, soft_delete: false});
        if(!user){
            res.status(400).json({message:"this user not Exist"})
        }
        else{
            res.status(200).json({message: 'Done',user})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const { user_name, fullname, address, phone, shop_name } = req.body;
        const { _id } = req.user;
        const userData = await User.findById(_id);
        if (!userData) {
            res.status(400).json({ message: "please enter data" });
        }
        else {
            const updatedUser = await User.findOneAndUpdate({ _id: _id },
                { user_name, fullname, address, phone, shop_name }, { new: true })
            res.status(200).json({ message: "changed successfully" , updatedUser});
        }
    }
    catch (err) {

        res.status(500).json({ message: "Catch Error : " +  err.message })
    }
}

const UpdatePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword,confirmPassword} = req.body;
        const { _id } = req.user;
        const user = await User.findOne(_id);

        if (!user) {
            res.status(400).json({ message: "sorry not a user" });
        }
        else {
            const checkPassword = await bcrypt.compare(oldPassword, user.password)
            if (!checkPassword) {
                res.status(400).json({ message: "password is miss match" });
            } else {
                if (newPassword != confirmPassword) {
                    res.status(400).json({ message: "confirm password not match new password" });
                } else {
                const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUND));
                const updatePassword = await User.findByIdAndUpdate({ _id},{ password: hashPassword}, { new: true });
                res.status(201).json({ message: "changed successfully" ,updatePassword});
                }
            }

        }


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Catch Error : " + err.message })
    }
}

const updateImage = async (req, res) => {

    try {
        if (req.fileErr) {
            res.status(406).json({message:"in-valid file format"});
        } else {
            const {_id} = req.user
            const user = await User.findById(_id);
            if (!user) {
                res.status(404).json({message:'in-valid user loggIn'})
            } else {
                if (user.profile_image){
                    const fullPath = '../' + user.profile_image;
                    fs.unlinkSync(path.join(__dirname , fullPath))
                }
                const imageURL = `${req.finalDestination}/${req.file.filename}`;
                const userUpdate = await User.findByIdAndUpdate(_id ,{profile_image:imageURL} ,{new:true});
                res.status(201).json({message:"Done updated Profile Picture" , userUpdate})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Catch Error' , error})
    }

}
const deActivatedUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if (!user) {
            res.status(400).json({ message: "not a user" });
        }
        else {
            const deActivatedUser = await User.findOneAndUpdate({_id}, { deActivated: true, active: false }, { new: true })
            res.status(200).json({ message: "deActivated successfully",deActivatedUser });
        }
    }
    catch (err) {

        res.status(500).json({ message: "Catch Error", err })
    }
}

const reActivatedUser = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).json({ message: "not a user" });
        }
        else {
            const reActivatedUser = await User.findOneAndUpdate({email}, {deActivated: false}, { new: true })
            res.status(200).json({ message: "reActive successfully , login now", reActivatedUser });
        }
    }
    catch (err) {

        res.status(500).json({ message: "Catch Error", err })
    }
}

module.exports = {
    updateUser,
    UpdatePassword,
    updateImage, 
    deActivatedUser ,
    getUserProfile ,
    reActivatedUser
}