'use client'

import Products from '@/components/Products'

export default function ProductsClient({ id }: { id?: string }) {
  return <Products id={id} />
}
