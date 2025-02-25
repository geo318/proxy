'use client'

import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries'
import { Product } from '@/types'
import { useGlobalContext } from '@/context/global.context'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { ProductListSkeleton } from './card-skeleton'

const ProductList = () => {
  const { loading, error, data } = useQuery<{
    getProducts: { products: Product[] }
  }>(GET_PRODUCTS)
  const { addItemToCart, cart } = useGlobalContext()

  if (error) return <p>Error loading products.</p>

  const handleAddToCart = (product: Product) => {
    addItemToCart(product._id, 1)
  }

  return (
    <div>
      <ul className='flex flex-col gap-5 mx-auto max-w-96'>
        {!loading ? (
          data?.getProducts.products.map((product: Product) => (
            <li key={product._id}>
              <Card key={product._id}>
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>Cost: ${product.cost}</CardDescription>
                </CardHeader>

                <CardContent>
                  <p>Available: {product.availableQuantity}</p>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={cart?.items.some(
                      (item) => item.product._id === product._id
                    )}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))
        ) : (
          <ProductListSkeleton />
        )}
      </ul>
    </div>
  )
}

export default ProductList
