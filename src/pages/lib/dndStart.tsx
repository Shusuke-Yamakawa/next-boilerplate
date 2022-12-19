import {Suspense, useState} from 'react'
import {Loader} from '@mantine/core'
import {DndStart} from '@/components/DndStart'

export default function dnd() {
  return (
    <Suspense fallback={<Loader />}>
      <DndStart />
    </Suspense>
  )
}
