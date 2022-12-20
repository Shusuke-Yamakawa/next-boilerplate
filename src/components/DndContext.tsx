import {FC, ReactNode, type MouseEvent, type KeyboardEvent} from 'react'
import {
  closestCenter,
  DndContext as LibDndContext,
  DragEndEvent,
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor,
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
  children: JSX.Element[]
}

// data-dndkit-disabled-dnd-flag="true" が指定されている要素はドラッグ無効にする
const shouldHandleEvent = (element: HTMLElement | null) => {
  let cur = element

  while (cur) {
    if (cur.dataset && cur.dataset.dndkitDisabledDndFlag) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}

// MouseSensorをoverrideして、data-dndkit-disabled-dnd-flagが指定されている要素はドラッグ無効にする
class MouseSensor extends LibMouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown' as const,
      handler: ({nativeEvent: event}: MouseEvent): boolean => {
        return shouldHandleEvent(event.target as HTMLElement)
      },
    },
  ]
}

// KeyboardSensorをoverrideして、data-dndkit-disabled-dnd-flagが指定されている要素はドラッグ無効にする
class KeyboardSensor extends LibKeyboardSensor {
  static activators = [
    {
      eventName: 'onKeyDown' as const,
      handler: ({nativeEvent: event}: KeyboardEvent<Element>): boolean => {
        return shouldHandleEvent(event.target as HTMLElement)
      },
    },
  ]
}

export const DndContext: FC<Props> = ({handleDragEnd, items, children}) => {
  // MouseSensorがマウスでの移動許可。
  // KeyboardSensorがキーボードでの移動許可。sortableKeyboardCoordinatesは矢印キーで移動許可
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div className="m-auto mt-8 w-96">
      {/*
       * id="0" 以下のwarningを出さないために設定
       * https://github.com/clauderic/dnd-kit/issues/926
       */}
      <LibDndContext id="0" sensors={sensors} onDragEnd={handleDragEnd}>
        {/*
         * verticalListSortingStrategy 垂直リスト用の最適化設定
         */}
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
      </LibDndContext>
    </div>
  )
}
