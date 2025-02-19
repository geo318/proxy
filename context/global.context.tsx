'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Cart, CartItemMessage, CartMutation } from '@/types'
import { GET_CART, GET_CART_HASH } from '@/graphql/queries'
import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM_QUANTITY,
} from '@/graphql/mutations'

interface GlobalContextType {
  cart: Cart | null
  pendingChanges: CartItemMessage[] | null
  addItemToCart: (productId: string, quantity: number) => Promise<void>
  removeItemFromCart: (cartItemId: string) => Promise<void>
  updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>
  acknowledgeChanges: () => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: cartData, refetch: refetchCart } = useQuery<{ getCart: Cart }>(
    GET_CART
  )

  const [cart, setCart] = useState<Cart | null>(null)
  const [pendingChanges, setPendingChanges] = useState<
    CartItemMessage[] | null
  >(null)
  const cartHashRef = useRef<string | null>(null)

  // Poll the GET_CART query every 10 seconds
  const { data: cartHash, stopPolling } = useQuery<{
    getCart: { hash: string }
  }>(GET_CART_HASH, {
    pollInterval: 10 * 1000,
  })

  useEffect(() => {
    if (cartData && !cart) {
      setCart(cartData.getCart)
      cartHashRef.current = cartData.getCart.hash
    }
  }, [cartData, cart])

  useEffect(() => {
    if (!cartHash || !cart) {
      return
    }

    const newHash: string = cartHash.getCart.hash

    // If we already have a cart loaded, check if the hash has changed
    // to reduce unnecessary api calls

    if (cartHashRef.current === newHash) {
      return
    }

    refetchCart().then((response) => {
      const newCart = response.data?.getCart
      const changes: CartItemMessage[] = newCart.items.reduce(
        (acc, item, i) => {
          const newQuantity = item.quantity
          const oldQuantity = cart?.items[i]?.quantity ?? 0

          if (newQuantity < oldQuantity) {
            acc.push({
              event:
                newQuantity === 0
                  ? 'ITEM_OUT_OF_STOCK'
                  : 'ITEM_QUANTITY_UPDATED',
              payload: item,
            })
          }

          return acc
        },
        [] as CartItemMessage[]
      )
      setPendingChanges(changes)
      setCart(newCart)
      cartHashRef.current = newHash
    })
  }, [cartHash, cart, refetchCart])

  useEffect(() => {
    // Cleanup function to stop polling when the component unmounts
    return () => {
      stopPolling()
    }
  }, [stopPolling])

  const [addItemMutation] = useMutation<CartMutation<'addItem'>>(ADD_ITEM)
  const [removeItemMutation] =
    useMutation<CartMutation<'removeItem'>>(REMOVE_ITEM)
  const [updateItemQuantityMutation] =
    useMutation<CartMutation<'updateItemQuantity'>>(UPDATE_ITEM_QUANTITY)

  const addItemToCart = async (productId: string, quantity: number) => {
    const response = await addItemMutation({
      variables: { input: { productId, quantity } },
    })

    if (response.data?.addItem) {
      setCart(response.data.addItem)
    }
  }

  const removeItemFromCart = async (cartItemId: string) => {
    const response = await removeItemMutation({
      variables: { input: { cartItemId } },
    })

    if (response.data?.removeItem) {
      setCart(response.data.removeItem)
    }
  }

  const updateItemQuantity = async (cartItemId: string, quantity: number) => {
    if (!cart) return

    updateItemQuantityMutation({
      variables: { input: { cartItemId, quantity } },
    }).then(() => {
      const updatedItems = cart.items.map((item) =>
        item._id === cartItemId ? { ...item, quantity } : item
      )
      setCart({ ...cart, items: updatedItems })
    })
  }

  const acknowledgeChanges = () => {
    setPendingChanges(null)
  }

  return (
    <GlobalContext.Provider
      value={{
        cart,
        pendingChanges,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        acknowledgeChanges,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useCart must be used within a GlobalContextProvider')
  }
  return context
}
