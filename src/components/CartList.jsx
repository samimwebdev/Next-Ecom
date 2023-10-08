'use client'
import { Button, Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faMugHot,
  faDeleteLeft,
} from '@fortawesome/free-solid-svg-icons'
library.add(faCheckSquare, faMugHot, faDeleteLeft)

export default function CartList({
  loading,
  cartProducts,
  removeProductFromCart,
}) {
  if (cartProducts?.length === 0) {
    return (
      <p className="text-center"> No Product in the cart , Please shop Now</p>
    )
  }
  return (
    <>
      {cartProducts?.map((product) => {
        console.log({ product })
        return (
          <div className="flex items-center justify-center " key={product._id}>
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
                      priority={true}
                      src={product.product.mediaUrl}
                      width="400"
                    />
                  </div>
                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h1 className="text-large font-bold mt-2">
                          {product.product.name}
                        </h1>
                        <p className="text-small text-foreground/80">
                          {product.quantity} x $ {product.product.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center mt-2">
                      <Button
                        color="danger"
                        variant="bordered"
                        endContent={<FontAwesomeIcon icon="delete-left" />}
                        onClick={() =>
                          removeProductFromCart(product.product._id)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )
      })}
    </>
  )
}
