'use client'

import { Three } from '@/helpers/components/Three'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <Three>
          <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
        </Three>
      </Suspense>
    </>
  )
}
