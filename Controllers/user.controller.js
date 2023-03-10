const User = require("../Models/User.model");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const Product = require("../Models/Product.model");


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
};

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
};

const updatePassword = async (req, res) => {
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
};
//updateImage
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

};
//deActivatedUser
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
};
//reActivatedUser
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
};

//get whishlist
const getWhislist = async(req,res)=>{
    try {
        const {_id}= req.user;
        const user = await User.findById(_id).select(' -_id whishlist');
        if (!user) {
            res.status(404).json({ message: "in-valid user id" , user })
        } else {
            if (!user.whishlist.length > 0) {
                res.status(405).json({message:"You Didn't have products in wishlist"})
            } else {
                const {whishlist} = user;
                let wishListProducts = [];
                for (let i = 0; i < whishlist.length; i++) {
                    let product = await Product.findOne({_id:whishlist[i],soft_delete:false});
                    if(product != null)
                     wishListProducts.push(product);
                }
                if (wishListProducts.length > 0) {
                    res.status(200).json({message:'Done' , wishListProducts})
                } else {
                    res.status(200).json({message:'Sorry your product in wishList is deleted' , wishListProducts})

                }
            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
}

//whishlist User
const whishlistUser = async(req,res)=>{
    try {
        const {_id}= req.user;
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "in-valid product id" })
        } else {
            const user = await User.findById(_id);
            if (!user) {
                res.status(404).json({ message: "in-valid user id" })
            } else {
                const userWhishlist  = user.whishlist.find(product => product == productId);
                if(userWhishlist){
                    res.status(400).json({message:"You but that before"});
                }else{
                    const updateWhishlist = await User.findByIdAndUpdate({_id} , {$push:{whishlist:productId}} , {new:true});
                    if (!updateWhishlist) {
                        res.status(400).json({message:"You do it before"});
                    } else {
                        res.status(200).json({message:"Done , Product in wishList"});

                    }

                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
};
//unWhishlist User
const unWhishlistUser = async(req,res)=>{
    try {
        const {_id}= req.user;
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "in-valid product id" })
        } else {
            const user = await User.findById(_id);
            if (!user) {
                res.status(404).json({ message: "in-valid user id" })
            } else {
                const userWhishlist  = user.whishlist.find(product => product == productId);
                if(!userWhishlist){
                    res.status(400).json({message:"Not found in whishlist"});
                }else{
                    const updateWhishlist = await User.findByIdAndUpdate({_id} , {$pull:{whishlist:productId}} , {new:true});
                    if (!updateWhishlist) {
                        res.status(400).json({message:"filed remove from whishlist"});
                    } else {
                        res.status(200).json({message:"Done , remove from wishList"});

                    }

                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
};

//get favoriteList User
const getfavoriteUserList = async(req,res)=>{
    try {
        const {_id}= req.user;
        const user = await User.findById(_id).select(' -_id favorite');
        if (!user) {
            res.status(404).json({ message: "in-valid user id" , user })
        } else {
            if (!user.favorite.length > 0) {
                res.status(405).json({message:"You Didn't have products in favorite laist"})
            } else {
                const {favorite} = user;
                let favoriteProducts = [];
                for (let i = 0; i < favorite.length; i++) {
                    let product = await Product.findOne({_id:favorite[i],soft_delete:false});
                    if(product != null ) favoriteProducts.push(product);
                }
                if (favoriteProducts.length > 0) {
                    res.status(200).json({message:'Done' , favoriteProducts})
                } else {
                    res.status(405).json({message:'Sorry your product in favorite is deleted'})
                }
            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
}

//favorite User
const favoriteUser = async(req,res)=>{
    try {
        const {_id}= req.user;
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "in-valid product id" })
        } else {
            const user = await User.findById(_id);
            if (!user) {
                res.status(404).json({ message: "in-valid user id" })
            } else {
                const userFavorite  = user.favorite.find(product => product == productId);
                if(userFavorite){
                    res.status(400).json({message:"You but that before"});
                }else{
                    const updateFavorite = await User.findByIdAndUpdate({_id} , {$push:{favorite:productId}} , {new:true});
                    if (!updateFavorite) {
                        res.status(400).json({message:"You do it before"});
                    } else {
                        res.status(200).json({message:"Done , Product in favorit"});

                    }

                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
};
//unfavorite User
const unFavoriteUser = async(req,res)=>{
    try {
        const {_id}= req.user;
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "in-valid product id" })
        } else {
            const user = await User.findById(_id);
            if (!user) {
                res.status(404).json({ message: "in-valid user id" })
            } else {
                const userFavorite  = user.favorite.find(product => product == productId);
                if(!userFavorite){
                    res.status(400).json({message:"Not found in favorit  list"});
                }else{
                    const updateFavorite = await User.findByIdAndUpdate({_id} , {$pull:{favorite:productId}} , {new:true});
                    if (!updateFavorite) {
                        res.status(400).json({message:"can't remove it from favorit list"});
                    } else {
                        res.status(200).json({message:"Done , remove it from favorit list"});

                    }

                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
};

//get Subscription list User
const getSubscriptionUser = async(req,res)=>{
    try {
        const {_id}= req.user;
        const user = await User.findById(_id).select(' -_id subscription');
        if (!user) {
            res.status(404).json({ message: "in-valid user id" , user })
        } else {
            if (!user.subscription.length > 0) {
                res.status(405).json({message:"You Didn't have any user in subscription laist"})
            } else {
                const {subscription} = user;
                let subscriptionSeller = [];
                for (let i = 0; i < subscription.length; i++) {
                    let seller = await User.findOne({_id:subscription[i],soft_delete:false}).select('-_id user_name shop_name description profile_image ');
                    if(seller != null)
                    subscriptionSeller.push(seller);
                }
                if (subscriptionSeller.length > 0) {
                    res.status(200).json({message:'Done' , subscriptionSeller})
                } else {
                    res.status(405).json({message:'Sorry your user in subscription is deleted'})
                }
            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
}

//subscriptionUser
const subscriptionUser = async(req,res)=>{
    try {
        const {_id}= req.user;
        const userSubscripID = req.params.id;
        const userSubscrip = await User.findById(userSubscripID);
        if (!userSubscrip) {
            res.status(404).json({ message: "in-valid subscrip user id" })
        } else {
            if (_id == userSubscripID) {
                res.status(403).json({ message: "You can't subscrip your self" });
            } else {
                const user = await User.findById(_id);
                if (!user) {
                    res.status(404).json({ message: "in-valid user id" })
                } else {
                    const userSub  = user.subscription.find(userID => userID == userSubscripID);
                    if(userSub){
                        res.status(400).json({message:"You subscrip before"});
                    }else{
                        const updateSubscription = await User.findByIdAndUpdate({_id} , {$push:{subscription:userSubscripID}} , {new:true});
                        if (!updateSubscription) {
                            res.status(400).json({message:"You do it before"});
                        } else {
                            res.status(200).json({message:"Done , subscription"});
                        }
                    }

                } 
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
};
//unSubscriptionUser
const unSubscriptionUser = async(req,res)=>{
    try {
        const {_id}= req.user;
        const userSubscripID = req.params.id;
        const userSubscrip = await User.findById(userSubscripID);
        if (!userSubscrip) {
            res.status(404).json({ message: "in-valid subscrip user id" })
        } else {
            const user = await User.findById(_id);
            if (!user) {
                res.status(404).json({ message: "in-valid user id" })
            } else {
                const userSub  = user.subscription.find(userID => userID == userSubscripID);
                if(!userSub){
                    res.status(400).json({message:"can't found in subscription list "});
                }else{
                    const updateSubscription = await User.findByIdAndUpdate({_id} , {$pull:{subscription:userSubscripID}} , {new:true});
                    if (!updateSubscription) {
                        res.status(400).json({message:"can't remove from subscription list"});
                    } else {
                        res.status(200).json({message:"Done , remove from subscription list"});
                    }
                }

            } 

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Catch Error", error })

    }
}


module.exports = {
    updateUser,
    updatePassword,
    updateImage, 
    deActivatedUser ,
    getUserProfile ,
    reActivatedUser ,
    whishlistUser ,
    favoriteUser ,
    subscriptionUser ,
    unWhishlistUser ,
    unFavoriteUser ,
    unSubscriptionUser ,
    getWhislist ,
    getfavoriteUserList ,
    getSubscriptionUser
}