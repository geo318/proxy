import { Cart as CartType } from '@/types'
import CartItem from './cart-item'
import { ProductListSkeleton } from './card-skeleton'

interface CartProps {
  cart: CartType | null
  isLoading: boolean
}

const Cart = ({ cart, isLoading }: CartProps) => {
  const skeleton = isLoading && !cart ? <ProductListSkeleton /> : null
  const emptyState = !cart ? <p>Your cart is empty.</p> : null

  return (
    <ul className='flex flex-col gap-5 min-w-80'>
      {skeleton ??
        emptyState ??
        cart?.items
          .toReversed()
          .map((item) => <CartItem key={item._id} item={item} />)}
    </ul>
  )
}

export default Cart
