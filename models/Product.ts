import mongoose, { Schema, model, models } from 'mongoose'
import { IProduct, ProductCatgories, ProductSizes } from 'types'

const ProductSchema = new Schema<Omit<IProduct, '_id'>>(
  {
    title: { type: String, required: true },
    slag: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ProductCatgories, required: true },
    images: { type: [String], default: [] },
    size: { type: String, enum: ProductSizes },
    color: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    brand: { type: String, required: true },
    rating: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const MProduct =
  (models['product'] as mongoose.Model<Omit<IProduct, '_id'>>) ??
  model<Omit<IProduct, '_id'>>('product', ProductSchema)

export default MProduct
