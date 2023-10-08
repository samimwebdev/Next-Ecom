import { getToken } from 'next-auth/jwt'

const { NextResponse } = require('next/server')

const secret = process.env.NEXTAUTH_SECRET
const getUserId = async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    return NextResponse.json({ mesaage: 'Unauthorized' }, { status: 403 })
  }

  const { userId, email } = token
  return { userId, email }
}

export default getUserId
