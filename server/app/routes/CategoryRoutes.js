const CategoryController = require('../controller/CategoryController')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

router.post('/create-category',upload.none(), CategoryController.CreateCategory )
router.get('/get-all-category',upload.none(), CategoryController.GetCategory )
router.get('/get-category-details/:id',upload.none(), CategoryController.GetCategoryDetails )
router.post('/update-category/:id',upload.none(), CategoryController.UpdateCategory )
router.post('/delete-category/:id',upload.none(), CategoryController.DeleteCategory)

module.exports = router