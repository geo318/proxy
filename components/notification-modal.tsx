import { CartItemMessage } from '@/types'

interface NotificationModalProps {
  changes: CartItemMessage[]
  onAcknowledge: () => void
}

const NotificationModal = ({
  changes,
  onAcknowledge,
}: NotificationModalProps) => {
  return (
    <div className='fixed inset-0 top-0 bg-gray-100 p-4 border border-gray-300 z-50'>
      <h2>Cart Updates</h2>
      <ul>
        {changes?.map((change) => (
          <li key={change.payload._id}>
            <strong>
              {change.event === 'ITEM_OUT_OF_STOCK'
                ? 'Out of Stock'
                : 'Quantity Updated'}
              :
            </strong>{' '}
            {change.payload.product.title}
          </li>
        ))}
      </ul>
      <button onClick={onAcknowledge}>OK</button>
    </div>
  )
}

export default NotificationModal
