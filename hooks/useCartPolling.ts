'use client'

import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GET_CART_HASH } from '@/graphql/queries'
import { CartItemMessage } from '@/types'
import { useGlobalContext } from '@/context/global.context'

export function useCartPolling() {
  const { cart, setCart, refetchCart } = useGlobalContext()
  const [pendingChanges, setPendingChanges] = useState<
    CartItemMessage[] | null
  >(null)
  const cartHashRef = useRef<string | null>(null)

  // 1. Poll only the cart hash every 10 seconds
  const { data: hashData, stopPolling, startPolling } = useQuery<{
    getCart: { hash: string }
  }>(GET_CART_HASH, {
    pollInterval: 10_000,
  })

  const refetchFullCart = useCallback(async () => {
    const { data } = await refetchCart()

    const newCart = data?.getCart
    if (!newCart || !cart) return

    const changes: CartItemMessage[] = []
    newCart.items.forEach((newItem) => {
      const oldItem = cart.items.find((i) => i._id === newItem._id)
      const newQty = newItem.quantity
      const oldQty = oldItem?.quantity ?? 0
      if (newQty < oldQty) {
        changes.push({
          event: newQty === 0 ? 'ITEM_OUT_OF_STOCK' : 'ITEM_QUANTITY_UPDATED',
          payload: newItem,
        })
      }
    })

    setCart(newCart)
    setPendingChanges(changes.length ? changes : null)
    cartHashRef.current = newCart.hash
  }, [cart, refetchCart, setCart, setPendingChanges])

  useEffect(() => {
    if (!hashData?.getCart?.hash || !cart) return

    const newHash = hashData.getCart.hash
    if (cartHashRef.current !== newHash) {
      refetchFullCart()
    }
    cartHashRef.current = cart.hash
  }, [hashData, cart, refetchFullCart])


  useEffect(() => {
    startPolling(10_000)
    return () => {
      stopPolling()
    }
  }, [])

  function acknowledgeChanges() {
    setPendingChanges(null)
  }

  return {
    pendingChanges,
    acknowledgeChanges,
  }
}
