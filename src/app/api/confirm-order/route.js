import { connectDB } from '@/lib/connectDB'
import Cart from '@/models/Cart'
import Order from '@/models/Order'
import calculateCartTotal from '@/utils/calculateCartTotal'
import getUserId from '@/utils/getUserId'
import { NextResponse } from 'next/server'

export async function GET(req, res) {
  await connectDB()
  const { userId, email } = await getUserId(req, res)

  try {
    // Find cart based on user id, populate it
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    })

    // Calculate cart totals again from cart products
    const { cartTotal } = calculateCartTotal(cart.products)
    //create new Order
    await new Order({
      user: userId,
      email: email,
      total: cartTotal,
      products: cart.products,
    }).save()
    // Clear products in cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } })
    return NextResponse.json({ message: 'successful' }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: 'Error in Order Confirmation' },
      { status: 200 }
    )
  }
}

//pagination
//account
// -order
// -role change
