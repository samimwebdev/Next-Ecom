'use client'
import { useParams } from 'next/navigation'
import {
  Card,
  CardBody,
  Image,
  Button,
  Progress,
  Input,
} from '@nextui-org/react'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
function product() {
  const [product, setProduct] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { id } = useParams()
  const session = useSession()
  const router = useRouter()
  const cartInput = React.useRef(null)

  const fecthSingleProduct = async () => {
    setLoading(true)
    const res = await fetch(`/api/products/${id}`)
    const product = await res.json()
    setProduct(product)
    setLoading(false)
  }

  React.useEffect(() => {
    fecthSingleProduct()
  }, [id])

  const addToCart = async (productId) => {
    //Add this product to cart
    const cartCount = cartInput.current.value
    console.log(cartInput.current.value)
    setLoading(true)
    const res = await fetch('/api/carts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        cartCount: Number(cartCount),
      }),
    })
    const data = await res.json()
    setLoading(false)

    toast('Product Added to cart Successfully')
    console.log({ data })
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[1000px]"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Product Image"
                className="object-cover"
                height={300}
                shadow="md"
                src={product.mediaUrl}
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="text-large font-bold mt-2">{product.name}</h1>
                  <p className="text-small text-foreground/80">
                    ${product.price}
                  </p>
                </div>
              </div>

              <p>{product.description}</p>
              <div className="flex flex-row space-x-2">
                <Input type="number" defaultValue={1} ref={cartInput} />
                {!session?.data?.user ? (
                  <Button
                    color="primary"
                    size="md"
                    onClick={() => router.push('/login')}
                  >
                    SignUp to Purchase
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    size="md"
                    className="flex-grow-1"
                    isDisabled={loading}
                    onClick={() => addToCart(product._id.toString())}
                  >
                    Add To cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default product
