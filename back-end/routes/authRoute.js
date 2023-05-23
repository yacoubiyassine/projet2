const express=require('express')
const {registerController, loginController, testController}=require('../controllers/authController')
const { isAdmin, requireSignIn } = require('../meddlewares/authMeddleware.js')

const router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)

// router.get('/test',requireSignIn, isAdmin, testController)
// router.get('/test',requireSignIn, isAdmin, testController);

// router.get('/user-auth',requireSigin,(req,res) => {
//     res.status(200).send({ok:true})
// })
// router.get('/admin-auth',requireSigIn,isAdmin,(req, res) => {
//     res.status(200).send({ok: true})
// })   

module.exports= router