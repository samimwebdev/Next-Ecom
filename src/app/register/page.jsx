'use client'

import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function Page() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    if (!name || !email || !password) {
      setError('Please Provide All field')
    } else {
      setError('')
    }

    try {
      //send post request to server
      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await res.json()
      console.log({ data })
      if (res.ok) {
        const form = evt.target
        form.reset()

        router.push('/login')
      } else {
        setError(data.message)
      }
    } catch (err) {
      console.log('Error During Registration', err)
      setError(error)
    }
  }

  return (
    <div className="grid place-items-center mt-10">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mb-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            variant="bordered"
            className="mb-2"
            onChange={(e) => setName(e.target.value)}
          />

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
            Signup
          </Button>
          <br />

          <Link className="text-sm mt-3 text-right mt='4" href={'/login'}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Page
