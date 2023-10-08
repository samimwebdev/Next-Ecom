import Stripe from 'stripe'

import { NextResponse } from 'next/server'
import Cart from '@/models/Cart'
import getUserId from '@/utils/getUserId'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const secret = process.env.NEXTAUTH_SECRET

export async function POST(req, res) {
  try {
    // const { cartProducts } = await req.json()
    const { userId } = await getUserId(req, secret)

    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    })

    const cartProducts = cart.products

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartProducts.map((cartProduct) => {
        return {
          price_data: {
            currency: 'USD',
            product_data: {
              name: cartProduct.product.name,
            },
            unit_amount: cartProduct.product.price * 100,
          },
          quantity: cartProduct.quantity,
        }
      }),
      mode: 'payment',
      // Set a success and cancel URL we will send customers to
      // These must be full URLs
      // In the next section we will setup CLIENT_URL
      success_url: `${process.env.CLIENT_URL}/order-confirmation`,
      cancel_url: `${process.env.CLIENT_URL}/order-cancel`,
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (err) {
    console.log(err)
  }
}
