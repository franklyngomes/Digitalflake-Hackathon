const ProductModel = require("../model/ProductModel");
const CategoryModel = require("../model/CategoryModel");
const httpCode = require("../helper/HttpCode");
const productValidationSchema = require("../helper/product.validator");
const fsSync = require("fs");
const fs = require("fs").promises;

class ProductController {
  async CreateProduct(req, res) {
    try {
      const { error } = productValidationSchema.validate(req.body);
      if (error) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }
      const { name, category, description } = req.body;
      if (!name || !category || !description) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "All fields are required!",
        });
      }
      const productData = new ProductModel({
        name,
        category,
        description,
      });
      if (req.file) {
        productData.image = req.file.path;
      }
      const data = await productData.save();
      return res.status(httpCode.create).json({
        status: true,
        message: "Product created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async GetProducts(req, res) {
    try {
      const products = await ProductModel.find({ isDeleted: false }).populate(
        "category",
        "name _id"
      );
      if (products.length === 0) {
        return res.status(httpCode.create).json({
          status: false,
          message: "No products found",
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async GetProductDetails(req, res) {
    try {
      const id = req.params.id;
      const details = await ProductModel.findById(id).populate("category");
      return res.status(httpCode.success).json({
        status: true,
        message: "Product details fetched successfully",
        data: details,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async UpdateProduct(req, res) {
    try {
      const id = req.params.id;
      const details = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const { error } = productValidationSchema.validate(req.body);
      if (error) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }
      if (req.file) {
        if (details.image) {
          const existingImage = details.image;
          if (fsSync.existsSync(existingImage)) {
            fs.unlink(existingImage);
          }
        }
        details.image = req.file.path;
      } else {
        details.image = details.image;
      }
      const data = await details.save();
      return res.status(httpCode.success).json({
        status: true,
        message: "Product updated successfully",
        data: data,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async DeleteProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Product not found!",
        });
      }
      if (product.image) {
        const existingImage = product.image;
        if (fsSync.existsSync(existingImage)) {
          fs.unlink(existingImage);
        }
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
