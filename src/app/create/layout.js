import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'user') {
    redirect('/login')
  }

  return children
}
