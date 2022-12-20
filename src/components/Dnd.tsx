import {useCallback, useMemo, useState} from 'react'
import {DragEndEvent} from '@dnd-kit/core'
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
      id: 2012,
      acquisitionYear: 2012,
    },
    {
      id: 2014,
      acquisitionYear: 2014,
    },
    {
      id: 2022,
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

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event
    if (!over) return
    console.log('active: ', active.id)
    console.log('over: ', over.id)

    if (active.id !== over.id) {
      const oldIndex = form.values.licentiates.findIndex(i => i.id === active.id)
      const newIndex = form.values.licentiates.findIndex(i => i.id === over.id)
      console.log('oldIndex: ', oldIndex)
      console.log('newIndex: ', newIndex)

      form.reorderListItem('licentiates', {from: oldIndex, to: newIndex})
    }
  }

  const addItems = useCallback(() => {
    form.insertListItem('licentiates', {
      id: 1,
      acquisitionYear: null,
    })
  }, [form])

  const deleteItems = useCallback(
    (id: number) => {
      const targetIndex = form.values.licentiates.findIndex(i => i.id === id)
      form.removeListItem('licentiates', targetIndex)
    },
    [form]
  )

  const fields = useMemo(
    () =>
      form.values.licentiates.map((item, index) => (
        <SortableItem key={item.id} id={item.id}>
          <div className="flex gap-4">
            <div>ラベル</div>
            <NumberInput
              className="m-0 w-48"
              placeholder="Your age"
              mt="sm"
              {...form.getInputProps(`licentiates.${index}.acquisitionYear`)}
            />
            <button onClick={() => deleteItems(item.id)} data-dndkit-disabled-dnd-flag="true">
              xxx
            </button>
          </div>
        </SortableItem>
      )),
    [deleteItems, form]
  )

  return (
    <div className="flex flex-col items-center">
      <DndContext handleDragEnd={handleDragEnd} items={form.values.licentiates}>
        {fields}
      </DndContext>
      <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      <button className="mt-4 border-2 bg-orange-300" onClick={addItems}>
        フォーム追加
      </button>
    </div>
  )
}
