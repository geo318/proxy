import { CartItem as CartItemType } from '@/types'
import { useGlobalContext } from '@/context/global.context'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Minus, Plus } from 'lucide-react'

interface CartItemProps {
  item: CartItemType
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItemFromCart, updateItemQuantity } = useGlobalContext()

  return (
    <li>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{item.product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex space-x-1.5'>
              <Label
                htmlFor='framework'
                className='font-bold flex items-center justify-center'
              >
                Price:
              </Label>
              <p className='font-medium'>${item.product.cost}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <section className='flex items-center justify-center self-stretch'>
            <Button
              variant={
                item.quantity >= item.product.availableQuantity
                  ? 'ghost'
                  : 'outline'
              }
              onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
              disabled={item.quantity >= item.product.availableQuantity}
              title={
                item.quantity >= item.product.availableQuantity
                  ? 'Cannot add more than available quantity'
                  : 'Add more'
              }
            >
              <Plus />
            </Button>
            <div className='flex space-x-1.5 mx-auto items-center justify-center px-4'>
              <Label htmlFor='name'>Q:</Label>
              <p className='font-medium'>
                {item.quantity} / {item.product.availableQuantity}
              </p>
            </div>
            <Button
              onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
              variant={item.quantity <= 1 ? 'ghost' : 'outline'}
              disabled={item.quantity <= 1}
              title={
                item.quantity <= 1
                  ? 'Click "Remove" instead'
                  : 'Reduce quantity'
              }
            >
              <Minus />
            </Button>
          </section>
          <Button
            variant='destructive'
            onClick={() => removeItemFromCart(item._id)}
          >
            Remove
          </Button>
        </CardFooter>
      </Card>
    </li>
  )
}

export default CartItem
