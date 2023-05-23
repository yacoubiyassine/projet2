const express=require('express')
const {isAdmin, requireSingIn} from './../middlewares/authMiddleware'
const { createCategoryController } = require('../controllers/categoryController')

const router = express.Router()
  router.post('create-category',requireSingIn,isAdmin,createCategoryController)

module.exports= router