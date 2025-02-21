import { Suspense } from 'react'
import Cart from './_components/cart-wrapper'

export default function CartPage() {
  return (
    <main>
      <h1 className='text-2xl font-bold text-center'>Your Shopping Cart</h1>
      <Suspense>
        <Cart />
      </Suspense>
    </main>
  )
}
