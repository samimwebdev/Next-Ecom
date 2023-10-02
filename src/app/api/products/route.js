import { connectDB } from '@/lib/connectDB'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export async function GET(req, res) {
  try {
    await connectDB()

    const products = await Product.find({})
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Server error in Finding product' },
      { status: 500 }
    )
  }
}

export async function POST(req, res) {
  try {
    await connectDB()
    const { name, price, description, mediaUrl } = await req.json()
    console.log(req.body)

    if (!name || !price || !description || !mediaUrl) {
      return NextResponse.json(
        { message: 'Product missing one or more fields' },
        { status: 422 }
      )
    }
    const products = await new Product({
      name,
      price,
      description,
      mediaUrl,
    }).save()
    return NextResponse.json(products, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Server error in creating product' },
      { status: 500 }
    )
  }
}
