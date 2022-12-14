import {Suspense} from 'react'
import {Loader} from '@mantine/core'
import {Dnd} from '@/components/Dnd'

export default function dnd() {
  return (
    <Suspense fallback={<Loader />}>
      <Dnd />
    </Suspense>
  )
}
