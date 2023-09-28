'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar'

import { Link } from '@nextui-org/link'
import nextLink, { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const pathName = usePathname()
  const { data: session } = useSession()
  const user = session?.user

  const isMenuActive = (routePath) => {
    return pathName === routePath
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Next Ecommerce</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {user && (
          <>
            <NavbarItem isActive={isMenuActive('/cart')}>
              <Link as={nextLink} href="/cart">
                Cart
              </Link>
            </NavbarItem>
            <NavbarItem isActive={isMenuActive('/account')}>
              <Link as={nextLink} href="/account">
                Account
              </Link>
            </NavbarItem>
            <Button
              as={Link}
              color="secondary"
              onClick={() => {
                signOut()
              }}
              variant="ghost"
            >
              Logout
            </Button>
          </>
        )}

        {!user && (
          <>
            <NavbarItem isActive={isMenuActive('/register')}>
              <Link as={nextLink} href="/register">
                Register
              </Link>
            </NavbarItem>
            <NavbarItem isActive={isMenuActive('/login')}>
              <Link as={nextLink} href="/login">
                login
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
