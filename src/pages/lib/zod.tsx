import {Suspense} from 'react'
import {Loader} from '@mantine/core'
import {ZodComponent} from '@/components/zod'

export default function zod() {
  return (
    <Suspense fallback={<Loader />}>
      <ZodComponent />
    </Suspense>
  )
}
