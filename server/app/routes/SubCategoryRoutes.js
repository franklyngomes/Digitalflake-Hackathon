const SubCategoryController = require('../controller/SubCategoryController')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

router.get('/subcategory/list',SubCategoryController.ListPage )
router.get('/subcategory/add',SubCategoryController.CreatePage )
router.get('/subcategory/edit/:id',SubCategoryController.EditPage )
router.post('/create-subcategory',upload.none(), SubCategoryController.CreateSubCategory )
router.get('/get-all-subcategory',upload.none(), SubCategoryController.GetSubCategory )
router.get('/get-subcategory-details/:id',upload.none(), SubCategoryController.GetSubCategoryDetails )
router.post('/update-subcategory/:id',upload.none(), SubCategoryController.UpdateSubCategory )
router.post('/delete-subcategory/:id',upload.none(), SubCategoryController.DeleteSubCategory)

module.exports = router