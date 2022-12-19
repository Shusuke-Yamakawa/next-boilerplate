import {useState} from 'react'
import {arrayMove} from '@dnd-kit/sortable'
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

export const Dnd = () => {
  const items = [
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
  ]

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      licentiates: items,
    },
    validateInputOnChange: true,
  })

  const handleDragEnd = (event: any) => {
    const {active, over} = event
    if (active.id !== over.id) {
      console.log(active)
      console.log(over)
      form.reorderListItem('licentiates', {from: active.id, to: over.id})
    }
  }

  const fields = form.values.licentiates.map((_, index) => (
    <SortableItem key={index} id={index}>
      <div key={index} className="w-96 border-2 border-orange-200 p-4">
        <NumberInput
          className="m-0 w-48"
          placeholder="Your age"
          mt="sm"
          {...form.getInputProps(`licentiates.${index}.acquisitionYear`)}
        />
      </div>
    </SortableItem>
  ))

  return (
    <div className="flex flex-col items-center">
      <DndContext handleDragEnd={handleDragEnd} items={form.values.licentiates}>
        <div className="mt-6">{fields}</div>
      </DndContext>
      <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </div>
  )
}
