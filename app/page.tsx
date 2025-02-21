import ProductList from '@/components/product-list'
import { Suspense } from 'react'

export default function Home() {
  return (
    <main>
      <h1 className='text-2xl font-bold text-center mb-10'>Product List</h1>
      <Suspense>
        <ProductList />
      </Suspense>
    </main>
  )
}
