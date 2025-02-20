'use client'

import { ROUTES } from '@/config'
import { cn } from '@/lib/utils'
import { HomeIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

const Nav = () => {
  const pathname = usePathname()
  return (
    <nav className='flex gap-5 mx-auto'>
      <Link href={ROUTES.home} className='flex items-center justify-center'>
        <Button
          variant={ROUTES.home === pathname ? 'secondary' : 'ghost'}
          className={cn(
            'font-semibold',
            pathname === ROUTES.home && 'underline'
          )}
        >
          <HomeIcon />
          Home
        </Button>
      </Link>
      <Link href={ROUTES.cart} className='flex items-center justify-center'>
        <Button
          variant={ROUTES.cart === pathname ? 'secondary' : 'ghost'}
          className={cn(
            'font-semibold',
            pathname === ROUTES.cart && 'underline'
          )}
        >
          <ShoppingCartIcon />
          Cart
        </Button>
      </Link>
    </nav>
  )
}

export default Nav
