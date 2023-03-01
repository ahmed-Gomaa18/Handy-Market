const User = require("../Models/User.model");
const bcrypt = require('bcryptjs');
const { user } = require("../utils/user.endPoints");

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
            res.status(200).json({ message: "changed successfully" });
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
                if (newPassword!=confirmPassword) {
                    res.status(400).json({ message: "confirm password not match new password" });
                } else {
                const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUND));
                const updatePassword = await User.findByIdAndUpdate({ _id},{ newPassword: hashPassword, code: " " }, { new: true });
                res.status(200).json({ message: "changed successfully" });
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
        const { profile_image } = req.body;
        const { _id } = req.user;
        const user = await User.findOne(_id);
        if (!user) {
            res.status(400).json({ message: "sorry not a user" });
        }
        else {
            const updatedImg = await User.findOneAndUpdate({ _id: _id },
                { profile_image }, { new: true })
            res.status(200).json({ message: "changed successfully" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Catch Error", err })
    }
}
const deleteUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if (!user) {
            res.status(400).json({ message: "not a user" });
        }
        else {
            const deleteUser = await User.findOneAndUpdate({ _id: _id }, { soft_delete: true, deActivated: true, active: true }, { new: true })
            res.status(200).json({ message: "deleted successfully" });
        }
    }
    catch (err) {

        res.status(500).json({ message: "Catch Error", err })
    }
}

module.exports = {
    updateUser, UpdatePassword, updateImage, deleteUser ,getUserProfile
}