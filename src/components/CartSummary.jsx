import calculateCartTotal from '@/utils/calculateCartTotal'
import { Button } from '@nextui-org/react'
import React from 'react'

function CartSummary({ cartProducts, success, loading }) {
  const [cartAmount, setCartAmount] = React.useState(0)
  const [isCartEmpty, setCartEmpty] = React.useState(false)

  React.useEffect(() => {
    if (cartProducts?.length && !loading) {
      const { cartTotal } = calculateCartTotal(cartProducts)
      setCartAmount(cartTotal)
      setCartEmpty(cartProducts.length === 0)
    }
  }, [cartProducts, loading])

  const checkout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartProducts,
        }),
      })
      if (!res.ok) {
        throw Error('Error in Checkout')
      }
      const data = await res.json()
      console.log({ data })
      window.location = data.url
    } catch (res) {
      console.log(res.message)
    }
  }

  return (
    cartProducts?.length && (
      <div className="flex items-center justify-center mt-3 ">
        <strong className="text-center">Sub total:</strong> ${cartAmount}
        <Button
          icon="cart"
          isDisabled={isCartEmpty || success}
          color="secondary"
          className="ml-2"
          onClick={checkout}
        >
          Checkout
        </Button>
      </div>
    )
  )
}

export default CartSummary
