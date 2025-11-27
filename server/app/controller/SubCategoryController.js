const SubCategoryModel = require("../model/SubCategoryModel")
const httpCode = require("../helper/HttpCode");

class SubCategoryController {
  async CreateSubCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "SubCategory name is required!",
        });
      }
      const SubCategoryData = new SubCategoryModel({
        name,
      });
      const data = await SubCategoryData.save();
      return res.status(httpCode.create).json({
        status: true,
        message: "SubCategory created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async GetSubCategory(req, res) {
    try {
      const SubCategory = await SubCategoryModel.find({ isDeleted: false });
      if (SubCategory.length === 0) {
        return res.status(httpCode.create).json({
          status: false,
          message: "No categories found",
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Categories fetched successfully",
        data: SubCategory,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async GetSubCategoryDetails(req, res) {
    try {
      const id = req.params.id;
      const details = await SubCategoryModel.findById(id).populate("category");
      return res.status(httpCode.success).json({
        status: true,
        message: "SubCategory details fetched successfully",
        data: details,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async UpdateSubCategory(req, res) {
    try {
      const id = req.params.id;
      const SubCategory = await SubCategoryModel.findById(id);
      if (!SubCategory) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "SubCategory not found",
        });
      }
      if (req.body.name) {
        SubCategory.name = req.body.name;
      }
      const updated = await SubCategory.save();
      return res.status(httpCode.success).json({
        status: true,
        message: "SubCategory updated successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async DeleteSubCategory(req, res) {
    try {
      const id = req.params.id;
      const SubCategory = await SubCategoryModel.findById(id);
      if (SubCategory) {
        SubCategory.isDeleted = true;
      }
      await SubCategory.save();
      return res.status(httpCode.success).json({
        status: true,
        message: "SubCategory deleted successfully",
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
