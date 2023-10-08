'use client'
import { Button, Input, Textarea } from '@nextui-org/react'
// import cloudinary from 'cloudinary'
// import Image from 'next/image'

import { Image } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: '',
}

async function getProducts() {
  const res = await fetch('/api/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

function page() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT)
  const [mediaPreview, setMediaPreview] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [error, setError] = React.useState('')
  const router = useRouter()

  //Restrict Page view
  const { data: session } = useSession()
  const user = session?.user

  React.useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el))
    isProduct ? setDisabled(false) : setDisabled(true)
  }, [product])

  function handleChange(event) {
    const { name, value, files } = event.target
    if (name === 'media') {
      setProduct((prevState) => ({ ...prevState, media: files[0] }))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  async function handleImageUpload() {
    const data = new FormData()
    data.append('file', product.media)
    data.append('upload_preset', 'next-ecom')
    //   data.append('dmdcu4uge', 'nextEcommerce')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dmdcu4uge/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const result = await res.json()
    return result.url
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      setLoading(true)
      setError('')
      const mediaUrl = await handleImageUpload()
      const { name, price, description } = product

      const res = await fetch('api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
          description,
          mediaUrl,
        }),
      })

      const data = await res.json()
      if (!data.ok) {
        setError(res.message)
      }
      setProduct(INITIAL_PRODUCT)
      router.push('/')
      setSuccess(true)
    } catch (error) {
      console.log(error)
      setError(error.message)
      //   catchErrors(error, setError)
    } finally {
      setLoading(false)
      setDisabled(false)
    }
  }

  return (
    <div className="grid place-items-center mt-10">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Add Product</h1>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mb-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            name="name"
            variant="bordered"
            className="mb-2"
            value={product.name}
            onChange={handleChange}
          />
          <Input
            type="number"
            label="Price"
            name="price"
            variant="bordered"
            className="mb-2"
            value={product.price}
            onChange={handleChange}
          />
          <Input
            type="file"
            name="media"
            variant="bordered"
            accept="image/*"
            className="mb-2"
            onChange={handleChange}
          />
          {mediaPreview && (
            <Image
              isZoomed
              src={mediaPreview}
              width={400}
              height={300}
              alt="Product picture"
            />
          )}
          <Textarea
            type="tex"
            label="Description"
            name="description"
            variant="bordered"
            className="mb-2"
            size="md"
            onChange={handleChange}
          />
          <Button
            color="primary"
            type="submit"
            className="mt-3"
            isDisabled={disabled || loading}
          >
            Add Product
          </Button>
          <br />
        </form>
      </div>
    </div>
  )
}

export default page
