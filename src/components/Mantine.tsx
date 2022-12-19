import {useState} from 'react'
import {Autocomplete, NumberInput, TextInput} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import {useDebouncedState} from '@mantine/hooks'
import axios from 'axios'
import {z} from 'zod'
import {queryKeys} from '@/clients'
import {useFetch} from '@/hooks'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'

const schema = z.object({
  name: z.string().min(2, {message: 'Name should have at least 2 letters'}).trim(),
  email: z.string().email({message: 'Invalid email'}),
  schools: z.string().min(2, {message: 'schools should have at least 2 letters'}),
  age: z.number().min(18, {message: 'You must be at least 18 to create an account'}),
})

console.log('schema', zodResolver(schema))

export const MantineTest = () => {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: 'aaa@co.jp',
      email: '',
      schools: '東京大学',
      age: 18,
    },
  })
  const [inputSchool, setInputSchool] = useDebouncedState('', 300)

  const getSchools = async () => {
    const {data} = await axios.get(`${API_URL}${RESUME_URL.MASTER_SCHOOL}`, {params: {q: inputSchool, limit: 10}})
    return data.items
  }
  const {data: schools}: any = useFetch(queryKeys.master.schools(inputSchool).queryKey, getSchools, false, {
    suspense: false,
    enabled: inputSchool !== '',
  })
  const schoolSuggestions = schools
    ? schools.map((data: any) => ({
        value: data.name,
      }))
    : []

  return (
    <form className="flex flex-col items-center" onSubmit={form.onSubmit(values => console.log(values))}>
      <TextInput className="m-4 w-48" label="Email" placeholder="example@mail.com" {...form.getInputProps('email')} />
      <TextInput className="m-4 w-48" label="Name" placeholder="John Doe" mt="sm" {...form.getInputProps('name')} />
      <Autocomplete
        className="m-4 w-48"
        data={schoolSuggestions}
        filter={() => true}
        error={form.getInputProps('schools').error}
        value={form.getInputProps('schools').value}
        onChange={value => {
          form.setFieldValue('schools', value)
          setInputSchool(value)
        }}
      />
      <NumberInput className="m-4 w-48" label="Age" placeholder="Your age" mt="sm" {...form.getInputProps('age')} />
      <button className="m-4 border-4 border-blue-500 bg-blue-500 p-1 text-white">submit</button>
    </form>
  )
}
