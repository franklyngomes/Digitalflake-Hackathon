const CategoryModel = require("../model/CategoryModel");
const httpCode = require("../helper/HttpCode");

class CategoryController {
  async CreateCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "Category name is required!",
        });
      }
      const categoryData = new CategoryModel({
        name,
      });
      const data = await categoryData.save();
      return res.status(httpCode.create).json({
        status: true,
        message: "Category created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async GetCategory(req, res) {
    try {
      const category = await CategoryModel.find({ isDeleted: false });
      if (category.length === 0) {
        return res.status(httpCode.create).json({
          status: false,
          message: "No categories found",
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Categories fetched successfully",
        data: category,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async GetCategoryDetails(req, res) {
    try {
      const id = req.params.id;
      const details = await CategoryModel.findById(id).populate("category");
      return res.status(httpCode.success).json({
        status: true,
        message: "Category details fetched successfully",
        data: details,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async UpdateCategory(req, res) {
    try {
      const id = req.params.id;
      const category = await CategoryModel.findById(id);
      if (!category) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "Category not found",
        });
      }
      if (req.body.name) {
        category.name = req.body.name;
      }
      const updated = await category.save();
      return res.status(httpCode.success).json({
        status: true,
        message: "Category updated successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async DeleteCategory(req, res) {
    try {
      const id = req.params.id;
      const category = await CategoryModel.findById(id);
      if (category) {
        category.isDeleted = true;
      }
      await category.save();
      return res.status(httpCode.success).json({
        status: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
