'use client'

import { NextPage } from 'next'
import { useCart } from '@/context/global.context'
import Cart from '@/components/cart'
import NotificationModal from '@/components/notification-modal'

const CartPage: NextPage = () => {
  const { cart, pendingChanges, acknowledgeChanges } = useCart()
  console.log(pendingChanges)
  return (
    <main>
      <h1>Your Shopping Cart</h1>
      {pendingChanges ? (
        <NotificationModal
          changes={pendingChanges}
          onAcknowledge={acknowledgeChanges}
        />
      ) : null}
      <Cart cart={cart} />
    </main>
  )
}

export default CartPage
