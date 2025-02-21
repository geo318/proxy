'use client'

import { useGlobalContext } from '@/context/global.context'
import Cart from '@/components/cart'
import NotificationModal from '@/components/notification-modal'
import { useCartPolling } from '@/hooks/useCartPolling'

export default function CartPage() {
  const { cart } = useGlobalContext()
  const { pendingChanges, acknowledgeChanges } = useCartPolling()

  return (
    <main>
      <h1 className='text-2xl font-bold text-center'>Your Shopping Cart</h1>

      <NotificationModal
        isOpen={Boolean(pendingChanges)}
        changes={pendingChanges}
        onAcknowledge={acknowledgeChanges}
      />

      <article className='flex flex-col gap-3 items-center my-10'>
        <Cart cart={cart} />
      </article>
    </main>
  )
}
