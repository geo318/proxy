import { gql } from '@apollo/client'

export const GET_CART_HASH = gql`
  query GetCart {
    getCart {
      hash
    }
  }
`

export const GET_CART = gql`
  query GetCart {
    getCart {
      _id
      hash
      items {
        _id
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
      createdAt
      updatedAt
    }
  }
`

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      products {
        _id
        title
        cost
        availableQuantity
        isArchived
      }
      total
    }
  }
`
