'use client'

import { ROUTES } from '@/config'
import { cn } from '@/lib/utils'
import { HomeIcon, ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { useGlobalContext } from '@/context/global.context'
import { useMemo } from 'react'

const Nav = () => {
  const pathname = usePathname()
  const { cart } = useGlobalContext()
  const itemsInCart = useMemo(
    () => cart?.items.reduce((acc, item) => acc + item.quantity, 0),
    [cart?.items]
  )

  const notificationBubble = (
    <div className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[.625rem] font-semibold text-white'>
      {itemsInCart}
    </div>
  )

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
            'font-semibold relative',
            pathname === ROUTES.cart && 'underline'
          )}
        >
          <ShoppingCartIcon />
          Cart
          {!!cart?.items.length && notificationBubble}
        </Button>
      </Link>
    </nav>
  )
}

export default Nav
