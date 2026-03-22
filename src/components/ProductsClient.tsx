'use client'

import dynamic from 'next/dynamic'

const Products = dynamic(() => import('@/components/Products'), {
  ssr: false,
  loading: () => <div className="w-full min-h-screen bg-[var(--color-black)]" />,
})

export default Products
