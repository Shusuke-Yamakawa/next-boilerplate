import {Suspense} from 'react'
import {Loader} from '@mantine/core'
import {DndTest} from '@/components/DndTest'

export default function dndTest() {
  return (
    <Suspense fallback={<Loader />}>
      <DndTest />
    </Suspense>
  )
}
