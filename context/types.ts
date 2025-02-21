import { Cart } from '@/types'

export interface GlobalContextType {
  cart: Cart | null
  setCart: React.Dispatch<React.SetStateAction<Cart | null>>
  addItemToCart: (productId: string, quantity: number) => Promise<void>
  removeItemFromCart: (cartItemId: string) => Promise<void>
  updateItemQuantity: (cartItemId: string, quantity: number) => Promise<void>
  refetchCart: () => Promise<{ data: { getCart: Cart } }>
  isCartLoading: boolean
}
