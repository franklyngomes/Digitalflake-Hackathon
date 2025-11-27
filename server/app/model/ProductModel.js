const mongoose = require('mongoose')
let slugify = require('slugify')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false
  },
}, {timestamps: true})

ProductSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});
const ProductModel = mongoose.model('newProducts', ProductSchema)
module.exports = ProductModel