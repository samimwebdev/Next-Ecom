import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const { String, Number } = mongoose.Schema.Types
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  description: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
})

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)
