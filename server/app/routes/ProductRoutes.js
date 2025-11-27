const ProductController = require('../controller/ProductController')
const express = require('express')
const router = express.Router()
const ImageUpload = require('../helper/ImageUpload')
const multer = require('multer')
const upload = multer()

router.post('/create-product',ImageUpload.single('image'), ProductController.CreateProduct )
router.get('/get-all-product',upload.none(), ProductController.GetProducts )
router.get('/get-product-details/:id',upload.none(), ProductController.GetProductDetails )
router.post('/update-product/:id',ImageUpload.single('image'), ProductController.UpdateProduct )
router.post('/delete-product/:id', ProductController.DeleteProduct)

module.exports = router