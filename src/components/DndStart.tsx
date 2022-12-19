import {useState} from 'react'
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
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

export const DndStart = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      content: '資格１',
    },
    {
      id: '2',
      content: '資格２',
    },
    {
      id: '3',
      content: '資格３',
    },
  ])
  // PointerSensorがマウスでの移動許可。
  // KeyboardSensorがキーボードでの移動許可。sortableKeyboardCoordinatesは矢印キーで移動許可
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const handleDragEnd = (event: any) => {
    const {active, over} = event
    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(i => i.id === active.id)
        const newIndex = items.findIndex(i => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="m-auto mt-8 w-96">
      {/*
       * collisionDetection closestCenterを指定することでドラッグしているアイテムと対象のアイテムの中央が交差すると、順番を入れ替えたという判定になる.
       */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/*
         * strategy 縦方向のソート
         */}
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <SortableItem key={item.id} id={item.id}>
              {item.content}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
