import { CartItem as CartItemType } from '@/types'
import { useCart } from '@/context/global.context'

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItemFromCart, updateItemQuantity } = useCart()

  return (
    <li className='mb-4'>
      <h3>{item.product.title}</h3>
      <p>Quantity: {item.quantity}</p>
      <p>Cost: ${item.product.cost}</p>
      <div>
        <button onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>
          +
        </button>
        <button
          onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <button onClick={() => removeItemFromCart(item._id)}>Remove</button>
      </div>
    </li>
  )
}

export default CartItem
