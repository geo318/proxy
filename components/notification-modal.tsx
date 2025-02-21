import { CartItemMessage } from '@/types'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'

import { Button } from './ui/button'

interface NotificationModalProps {
  isOpen: boolean
  changes: CartItemMessage[] | null
  onAcknowledge: () => void
}

const NotificationModal = ({
  isOpen,
  changes,
  onAcknowledge,
}: NotificationModalProps) => {
  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cart Updates</DialogTitle>
          <DialogDescription>
            The following changes occurred to your cart:
          </DialogDescription>
        </DialogHeader>

        <ul className='list-disc ml-5 space-y-1'>
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

        <DialogFooter>
          <Button onClick={onAcknowledge}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NotificationModal
