import {useState} from 'react'
import {closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from '@dnd-kit/sortable'
import {Autocomplete, NumberInput, Text, Code} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import {useDebouncedState} from '@mantine/hooks'
import axios from 'axios'
import {z} from 'zod'
import {queryKeys} from '@/clients'
import {DndContext} from '@/components/DndContext'
import {SortableItem} from '@/components/SortableItem'
import {useFetch} from '@/hooks'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'

const schema = z.object({
  licentiates: z.array(
    z.object({
      id: z.number().nullable(),
      acquisitionYear: z
        .number()
        .min(1930, {
          message: '1930年以降を入力してください',
        })
        .max(new Date().getFullYear(), {message: '未来年はやめて'})
        .optional()
        .nullable(),
    })
  ),
})

export const DndTest = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      acquisitionYear: 2012,
    },
    {
      id: '2',
      acquisitionYear: 2014,
    },
    {
      id: '3',
      acquisitionYear: 2022,
    },
  ])

  // const form = useForm({
  //   validate: zodResolver(schema),
  //   initialValues: {
  //     licentiates: items,
  //   },
  //   validateInputOnChange: true,
  // })

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

  const fields = items.map((_, index) => (
    <SortableItem key={index} id={index}>
      <NumberInput className="m-0 w-48" placeholder="Your age" mt="sm" />
    </SortableItem>
  ))

  return (
    <div className="flex flex-col items-center">
      <DndContext items={items} handleDragEnd={handleDragEnd}>
        {items.map(item => (
          <SortableItem key={item.id} id={item.id}>
            <NumberInput className="m-0 w-48" placeholder="Your age" mt="sm" />
          </SortableItem>
        ))}
      </DndContext>
    </div>
  )
}
