const mongoose = require("mongoose");
let slugify = require("slugify");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    slug: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

SubCategorySchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});
const SubCategoryModel = mongoose.model("subcategory", SubCategorySchema);
module.exports = SubCategoryModel;
