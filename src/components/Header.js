'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react'

import nextLink, { usePathname } from 'next/navigation'

export default function Header() {
  const pathName = usePathname()
  const user = false
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
              onClick={() => {}}
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
