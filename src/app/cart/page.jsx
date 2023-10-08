'use client'
import CartList from '@/components/CartList'
import CartSummary from '@/components/CartSummary'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

function page() {
  const { data: session } = useSession()
  // const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cartProducts, setCartProducts] = useState(null)
  const user = session?.user

  const getCartProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/carts/')
      const cartProducts = await res.json()
      setCartProducts(cartProducts.products)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getCartProducts()
    })()
  }, [])

  const removeProductFromCart = async (productId) => {
    try {
      const res = await fetch('/api/carts/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      })
      const data = await res.json()
      console.log({ data }, 'After Delete')

      setCartProducts(data.products)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {loading && !cartProducts ? (
        <p> Loading...</p>
      ) : (
        <>
          <CartList
            removeProductFromCart={removeProductFromCart}
            cartProducts={cartProducts}
            loading={loading}
          />
          <CartSummary cartProducts={cartProducts} loading={loading} />
        </>
      )}
    </>
  )
}

export default page
