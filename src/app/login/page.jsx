'use client'

import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (!email || !password) {
      setError('Please Provide All field')
    } else {
      setError('')
    }

    try {
      //lOGIN USING NEXT AUTH
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError('Invalid Credentials')
        return
      }

      router.replace('/account')
    } catch (err) {
      setError(error)
    }
  }

  return (
    <div className="grid place-items-center mt-10">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mb-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            variant="bordered"
            className="mb-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            variant="bordered"
            className="mb-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="primary" type="submit" className="mt-3">
            Login
          </Button>
          <br />

          <Link className="text-sm mt-3 text-right mt='4" href={'/register'}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Page
