'use client'

import { useGlobalContext } from '@/context/global.context'
import Cart from '@/components/cart'
import NotificationModal from '@/components/notification-modal'
import { useCartPolling } from '@/hooks/useCartPolling'

export default function CartWrapper() {
  const { cart, isCartLoading } = useGlobalContext()
  const { pendingChanges, acknowledgeChanges } = useCartPolling()

  return (
    <>
      <NotificationModal
        isOpen={Boolean(pendingChanges)}
        changes={pendingChanges}
        onAcknowledge={acknowledgeChanges}
      />

      <article className='flex flex-col gap-3 items-center my-10'>
        <Cart cart={cart} isLoading={isCartLoading} />
      </article>
    </>
  )
}
