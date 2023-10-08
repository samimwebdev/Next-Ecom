import { connectDB } from '@/lib/connectDB'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
  try {
    await connectDB()
    const product = await Product.findById(params.id)
    console.log({ product })

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    return NextResponse.json('Internal Server Error', { status: 500 })
  }
}
