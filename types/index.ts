export interface Product {
  _id: string
  title: string
  cost: number
  availableQuantity: number
  isArchived: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CartItem {
  _id: string
  cartId: string
  product: Product
  quantity: number
  addedAt: string
  updatedAt: string
}

export interface Cart {
  _id: string
  hash: string
  items: CartItem[]
  createdAt: string
  updatedAt: string
}

export type CartItemEvent = 'ITEM_QUANTITY_UPDATED' | 'ITEM_OUT_OF_STOCK'

export type Mutation = 'addItem' | 'removeItem' | 'updateItemQuantity'

export interface CartItemMessage {
  event: CartItemEvent
  payload: CartItem
}

export type CartMutation<T extends Mutation> = { [K in T]: Cart }
