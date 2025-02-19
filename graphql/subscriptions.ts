import { gql } from '@apollo/client'

export const CART_ITEM_UPDATE = gql`
  subscription CartItemUpdate {
    cartItemUpdate {
      event
      payload {
        _id
        cartId
        quantity
        addedAt
        updatedAt
        product {
          _id
          title
          cost
          availableQuantity
          isArchived
        }
      }
    }
  }
`
