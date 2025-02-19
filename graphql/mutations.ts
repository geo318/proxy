import { gql } from '@apollo/client'

export const ADD_ITEM = gql`
  mutation AddItem($input: AddItemArgs!) {
    addItem(input: $input) {
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

export const REMOVE_ITEM = gql`
  mutation RemoveItem($input: RemoveItemArgs!) {
    removeItem(input: $input) {
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

export const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {
    updateItemQuantity(input: $input) {
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
