'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries'
import { Product } from '@/types'
import { useCart } from '@/context/global.context'

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS)
  const { addItemToCart } = useCart()

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Error loading products.</p>

  const { products } = data.getProducts

  const handleAddToCart = (product: Product) => {
    addItemToCart(product._id, 1)
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product: Product) => (
          <li key={product._id}>
            <h3>{product.title}</h3>
            <p>Cost: ${product.cost}</p>
            <p>Available: {product.availableQuantity}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
