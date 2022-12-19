import {NumberInput, TextInput} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import z from 'zod'

const schema = z.object({
  startYear: z.number(),
  startMonth: z.number(),
  endYear: z.number(),
  endMonth: z.number(),
})

export const ZodComponent = () => {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      startYear: 2022,
      startMonth: 5,
      endYear: 2021,
      endMonth: 5,
    },
  })

  return (
    <form
      className="mx-auto flex w-96 flex-col py-10"
      onSubmit={form.onSubmit(values => {
        if (form.values.startYear > form.values.endYear) form.setFieldError('endYear', '不正な入力はやめて')
        console.log(values)
      })}
    >
      <NumberInput className="m-2 w-48" label="開始年" {...form.getInputProps('startYear')} />
      <NumberInput className="m-2 w-48" label="開始月" {...form.getInputProps('startMonth')} />
      <NumberInput className="m-2 w-48" label="終了年" {...form.getInputProps('endYear')} />
      <NumberInput className="m-2 w-48" label="終了月" {...form.getInputProps('endMonth')} />
      <button className="bg-black py-3 text-white">送信</button>
    </form>
  )
}
