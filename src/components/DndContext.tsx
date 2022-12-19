import {FC, ReactNode, useState} from 'react'
import {
  closestCenter,
  DndContext as DndContextKit,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {Autocomplete, NumberInput, TextInput} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import {useDebouncedState} from '@mantine/hooks'
import axios from 'axios'
import {z} from 'zod'
import {queryKeys} from '@/clients'
import {SortableItem} from '@/components/SortableItem'
import {useFetch} from '@/hooks'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'

type Props = {
  handleDragEnd: (event: DragEndEvent) => void
  items: {
    id: UniqueIdentifier
  }[]
  children: ReactNode
}

export const DndContext: FC<Props> = ({handleDragEnd, items, children}) => {
  // PointerSensorがマウスでの移動許可。
  // KeyboardSensorがキーボードでの移動許可。sortableKeyboardCoordinatesは矢印キーで移動許可
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div className="m-auto mt-8 w-96">
      {/*
       * collisionDetection closestCenterを指定することでドラッグしているアイテムと対象のアイテムの中央が交差すると、順番を入れ替えたという判定になる.
       */}
      <DndContextKit sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/*
         * strategy 縦方向のソート
         */}
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </DndContextKit>
    </div>
  )
}
