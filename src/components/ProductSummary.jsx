import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import Image from 'next/image'
import Link from 'next/link'

function ProductSummary({ product }) {
  const { name, price, description, sku, mediaUrl, _id } = product
  return (
    <Link href={`/products/${_id.toString()}`}>
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={mediaUrl}
            width={300}
            height={200}
          />
        </CardBody>

        <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{name}</p>
          <small className="text-default-500">${price}</small>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductSummary
