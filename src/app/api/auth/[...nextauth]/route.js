import { connectDB } from '@/lib/connectDB'
import User from '@/models/User'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials

        try {
          await connectDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }
          return user
        } catch (error) {
          console.log('Error: ', error)
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.userId = String(user._id)
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.userId = token.userId
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
