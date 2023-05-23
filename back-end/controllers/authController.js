const { comparePassword, hashPassword }=require ("../helpers/authHelper.js");
const userModel = require ("../models/userModel.js");
const  Jwt = require( "jsonwebtoken");

exports.registerController =async (req,res)=>{
    try {
        const {name,email,password,phone,address} = req.body
        if(!name){
            return res.send({msg:'Name is Required'})
        }
        if(!email){
            return res.send({msg:'Email is Required'});
        }
        if(!password){
            return res.send({msg:'Password is Required'});
        }
        if(!phone){
            return res.send({msg:'Phone is Required'});
        }
        if(!address){
            return res.send({msg:'Adress is Required'});
        }
        if (!answer) {
            return res.send({ msg: "Answer is Required" });
          }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login'
            })
        }
        const hashedPassword=await hashPassword(password)

        const user = new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword
        
        }).save()

        res.status(201).send({
            success:true,
            message:'User Register Successfuly',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registeration',
            error
        });
    }
};

exports.loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'email ou password non valid'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registred'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        // const token = await Jwt.sign({_id:user._id},process.env.secretKey,{
        //     expiresIn:"7d",
        // });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                _id: user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role: user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login',
           error
        })
    }
}

//forgotPasswordController

// export const forgotPasswordController = async (req, res) => {
// try {
// const { email, answer, newPassword } = req.body;
// if (!email) {
//   res.status(400).send({ message: "Emai is required" });
// }
// if (!answer) {
//   res.status(400).send({ message: "answer is required" });
// }
// if (!newPassword) {
//   res.status(400).send({ message: "New Password is required" });
// }
//check
// const user = await userModel.findOne({ email, answer });
// //validation
// if (!user) {
//   return res.status(404).send({
//     success: false,
//     message: "Wrong Email Or Answer",
//   });
// }
// const hashed = await hashPassword(newPassword);
// await userModel.findByIdAndUpdate(user._id, { password: hashed });
// res.status(200).send({
//   success: true,
//   message: "Password Reset Successfully",
// });
// } catch (error) {
// console.log(error);
// res.status(500).send({
//   success: false,
//   message: "Something went wrong",
//   error,
// });
// }
// };

// //test controller
// export const testController = (req, res) => {
// try {
// res.send("Protected Routes");
// } catch (error) {
// console.log(error);
// res.send({ error });
// }
// };

// //update prfole
// export const updateProfileController = async (req, res) => {
// try {
// const { name, email, password, address, phone } = req.body;
// const user = await userModel.findById(req.user._id);
// //password
// if (password && password.length < 6) {
//   return res.json({ error: "Passsword is required and 6 character long" });
// }
// const hashedPassword = password ? await hashPassword(password) : undefined;
// const updatedUser = await userModel.findByIdAndUpdate(
//   req.user._id,
//   {
//     name: name || user.name,
//     password: hashedPassword || user.password,
//     phone: phone || user.phone,
//     address: address || user.address,
//   },
//   { new: true }
// );
// res.status(200).send({
//   success: true,
//   message: "Profile Updated SUccessfully",
//   updatedUser,
// });
// } catch (error) {
// console.log(error);
// res.status(400).send({
//   success: false,
//   message: "Error WHile Update profile",
//   error,
// });
// }
// };
