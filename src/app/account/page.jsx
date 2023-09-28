import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

async function page() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }
  return (
    <div>
      Account Page "Restricted" {session.user.name}-{session.user.email}{' '}
    </div>
  )
}

export default page
