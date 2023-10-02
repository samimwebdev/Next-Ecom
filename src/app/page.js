import { Button } from '@nextui-org/button'
import Image from 'next/image'
import products from './products.json'
import ProdductSummary from '@/components/ProductSummary'
import Product from '@/models/Product'
import { connectDB } from '@/lib/connectDB'

// async function getProducts() {
//   const res = await fetch('/api/products', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   return await res.json()
// }

const fetchProducts = async () => {
  await connectDB()
  const products = await Product.find({})
  return products
}

export default async function Home() {
  const products = await fetchProducts()

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {products.map((product) => {
        return (
          <ProdductSummary product={product} key={product._id.toString()} />
        )
      })}
    </div>
  )
}
