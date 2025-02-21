import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

export function ProductListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className='h-4 w-3/4 mb-2' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-4 w-1/4' />
          </CardContent>
          <CardFooter>
            <Skeleton className='h-8 w-20' />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
