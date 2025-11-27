const mongoose = require('mongoose')
let slugify = require('slugify')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true,
  }
}, {timestamps: true})

CategorySchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});
const CategoryModel = mongoose.model('category', CategorySchema)
module.exports = CategoryModel