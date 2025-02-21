'use client'

import React, { createContext, useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM_QUANTITY,
} from '@/graphql/mutations'
import { Cart, CartMutation } from '@/types'
import { GET_CART } from '@/graphql/queries'

interface GlobalContextType {
  cart: Cart | null
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>
  addItemToCart: (productId: string, quantity: number) => Promise<void>
  removeItemFromCart: (cartItemId: string) => Promise<void>
  updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>
  refetchCart: () => Promise<{ data: { getCart: Cart } }>
  isCartLoading: boolean
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart | null>(null)

  const { refetch: refetchCart, loading: isCartLoading } = useQuery<{
    getCart: Cart
  }>(GET_CART, {
    onCompleted: (data) => {
      setCart(data.getCart)
    },
    fetchPolicy: 'cache-first',
  })

  const [addItemMutation] = useMutation<CartMutation<'addItem'>>(ADD_ITEM)

  async function addItemToCart(productId: string, quantity: number) {
    const id = `temp-${Date.now()}`
    await addItemMutation({
      variables: { input: { productId, quantity } },
      optimisticResponse: {
        addItem: {
          ...(cart ?? {}),
          items: cart?.items
            ? [
                ...cart.items,
                {
                  _id: id,
                  cartId: cart._id ?? 'temp-cart',
                  quantity,
                  addedAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  product: {
                    _id: productId,
                    title: 'Loading...',
                    cost: 0,
                    availableQuantity: 1,
                    isArchived: false,
                  },
                },
              ]
            : [],
          _id: cart?._id ?? 'temp-cart',
          hash: cart?.hash ?? '',
          createdAt: cart?.createdAt ?? new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },

      update: (_, { data }) => {
        if (!data?.addItem) return
        setCart(data.addItem)
      },
      onError: () => {
        setCart((prev) => {
          if (!prev) return null
          const items = prev?.items.filter((item) => item._id !== id)
          return {
            ...prev,
            items,
          }
        })
      },
    })
  }

  const [removeItemMutation] =
    useMutation<CartMutation<'removeItem'>>(REMOVE_ITEM)

  async function removeItemFromCart(cartItemId: string) {
    if (!cart) return

    const optimisticCart = structuredClone(cart)
    optimisticCart.items = optimisticCart.items.filter(
      (item) => item._id !== cartItemId
    )

    await removeItemMutation({
      variables: { input: { cartItemId } },
      optimisticResponse: {
        removeItem: {
          ...optimisticCart,
          updatedAt: new Date().toISOString(),
        },
      },
      update: (_, { data }) => {
        if (!data?.removeItem) return
        setCart(data.removeItem)
      },
    })
  }

  const [updateItemQuantityMutation] =
    useMutation<CartMutation<'updateItemQuantity'>>(UPDATE_ITEM_QUANTITY)

  async function updateItemQuantity(cartItemId: string, quantity: number) {
    if (!cart) return

    const optimisticCart = structuredClone(cart)
    optimisticCart.items = optimisticCart.items.map((item) =>
      item._id === cartItemId
        ? { ...item, quantity, updatedAt: new Date().toISOString() }
        : item
    )

    await updateItemQuantityMutation({
      variables: { input: { cartItemId, quantity } },
      optimisticResponse: {
        updateItemQuantity: {
          ...optimisticCart,
          updatedAt: new Date().toISOString(),
        },
      },
      update: (_, { data }) => {
        if (!data?.updateItemQuantity) return
        setCart(data.updateItemQuantity)
      },
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        refetchCart,
        isCartLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error('useCart must be used within a GlobalContextProvider')
  }
  return context
}
