import {Suspense} from 'react'
import {Loader} from '@mantine/core'
import {MantineTest} from '@/components/Mantine'

export default function Mantine() {
  return (
    <Suspense fallback={<Loader />}>
      <MantineTest />
    </Suspense>
  )
}
