import Product from '@/models/Product'
import { NextResponse } from 'next/server'
import jwt, { getToken } from 'next-auth/jwt'
import Cart from '@/models/Cart'
import mongoose from 'mongoose'
import getUserId from '@/utils/getUserId'
import { connectDB } from '@/lib/connectDB'

const { ObjectId } = mongoose.Types

export async function PUT(req, res) {
  try {
    await connectDB()
    const { productId, cartCount: quantity } = await req.json()
    //check if the product exists or not
    // const product = await Product.findById(productId)

    // if (!product)
    //   return NextResponse.json(
    //     { mesaage: 'No Product found to add into the cart' },
    //     { status: 404 }
    //   )

    const { userId } = await getUserId(req, res)

    // Get user cart based on userId
    const cart = await Cart.findOne({ user: userId })
    // Check if product already exists in cart
    const productExists = cart.products.some((productDoc) =>
      new ObjectId(productId).equals(productDoc.product)
    )
    // If so, increment quantity (by number provided to request)
    if (productExists) {
      await Cart.findOneAndUpdate(
        { _id: cart._id, 'products.product': productId },
        { $inc: { 'products.$.quantity': quantity } }
      )
    } else {
      // If not, add new product with given quantity
      const newProduct = { quantity, product: productId }
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } }
      )
    }

    return NextResponse.json(
      { mesaage: 'Product Added to Cart' },
      { status: 200 }
    )

    // return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: err }, { status: 500 })
  }

  //check if the product exists or not
}

export async function GET(req, res) {
  await connectDB()
  const { userId } = await getUserId(req, res)
  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    })
    return NextResponse.json(cart, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function DELETE(req, res) {
  await connectDB()
  const { productId } = await req.json()

  try {
    const { userId } = await getUserId(req, res)
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: 'products.product',
      model: 'Product',
    })

    return NextResponse.json(cart, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
