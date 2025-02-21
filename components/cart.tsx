import { Cart as CartType } from '@/types'
import CartItem from './cart-item'

interface CartProps {
  cart: CartType | null
}

const Cart = ({ cart }: CartProps) => {
  if (!cart) return <p>Your cart is empty.</p>

  return (
    <ul className='flex flex-col gap-5'>
      {cart.items.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </ul>
  )
}

export default Cart
