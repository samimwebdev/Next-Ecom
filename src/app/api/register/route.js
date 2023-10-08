import { connectDB } from '@/lib/connectDB'
import User from '@/models/User'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import Cart from '@/models/Cart'

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json()

    if (role) {
      return NextResponse.json(
        { message: 'User Role is not Allowed' },
        { status: 400 }
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectDB()
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json(
        { message: 'User Already Exists , please use new Email.' },
        { status: 400 }
      )
    }
    const newUser = await User.create({ name, email, password: hashedPassword })
    //create cart associated with the user
    await new Cart({ user: newUser._id }).save()
    return NextResponse.json({ message: 'User registered.' }, { status: 201 })
  } catch (error) {
    console.log({ error })
    return NextResponse.json(
      { message: 'An error occurred while registering the user.' },
      { status: 500 }
    )
  }
}
