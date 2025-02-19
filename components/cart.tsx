import { Cart as CartType } from '@/types'
import CartItem from './cart-item'

interface CartProps {
  cart: CartType | null
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  if (!cart) return <p>Your cart is empty.</p>

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cart.items.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </ul>
    </div>
  )
}

export default Cart
