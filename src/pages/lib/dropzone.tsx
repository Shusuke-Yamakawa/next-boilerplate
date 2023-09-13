import {Suspense} from 'react'
import {Loader} from '@mantine/core'
import {DropzoneComponent} from '@/components/Dropzone'

export default function Dropzone() {
  return (
    <Suspense fallback={<Loader />}>
      <DropzoneComponent />
    </Suspense>
  )
}
