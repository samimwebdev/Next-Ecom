'use client'
import { useParams } from 'next/navigation'

import React from 'react'
function product() {
  const [product, setProduct] = React.useState('')
  const { id } = useParams()

  // console.log(id)
  const fecthSingleProduct = async () => {
    const res = await fetch(`/api/products/${id}`)
    const product = await res.json()
    console.log(product)
    setProduct(product)
  }

  React.useEffect(() => {
    fecthSingleProduct()
  }, [id])

  return <div>product</div>
}

export default product
