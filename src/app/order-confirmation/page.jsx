'use client'

import { useEffect, useState } from 'react'

function page() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const confirmOrder = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/confirm-order/')
      if (!res.ok) {
        throw Error('Error in Confirming Order')
      }

      await res.json()
      setSuccess(true)
      setLoading(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    confirmOrder()
  }, [])

  if (loading) return '<p> Loading..... </p>'
  if (error) return '<p>Error in Confirming Order</p>'

  return success && <p>Order Confirmed</p>
}

export default page
