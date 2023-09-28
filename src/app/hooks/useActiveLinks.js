const { usePathname } = require('next/navigation')
const { useRouter } = require('next/router')

const useActiveLinks = (pathName) => {
  const pathName = usePathname()
  const isMenuActive = (routePath) => {
    return pathName === routePath
  }
  return isMenuActive
}
