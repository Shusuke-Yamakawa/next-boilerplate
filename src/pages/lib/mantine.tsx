import {Autocomplete, NumberInput, TextInput} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import axios from 'axios'
import {z} from 'zod'
import {queryKeys} from '@/clients'
import {useFetch} from '@/hooks'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'

const schema = z.object({
  name: z.string().min(2, {message: 'Name should have at least 2 letters'}),
  email: z.string().email({message: 'Invalid email'}),
  schools: z.string().min(2, {message: 'schools should have at least 2 letters'}),
  age: z.number().min(18, {message: 'You must be at least 18 to create an account'}),
})

export default function Mantine() {
  const getSchools = async () => {
    const {data} = await axios.get(`${API_URL}${RESUME_URL.MASTER_SCHOOL}`)
    return data.items
  }
  const {data: schools} = useFetch(queryKeys.master.schools.queryKey, getSchools, true)
  const schoolSuggestions = schools.map((data: any) => ({
    value: data.name,
  }))

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: 'aaa@co.jp',
      email: '',
      schools: '',
      age: 18,
    },
  })
  return (
    <form className="flex flex-col items-center" onSubmit={form.onSubmit(values => console.log(values))}>
      <TextInput className="m-4 w-48" label="Email" placeholder="example@mail.com" {...form.getInputProps('email')} />
      <TextInput className="m-4 w-48" label="Name" placeholder="John Doe" mt="sm" {...form.getInputProps('name')} />
      <Autocomplete className="m-4 w-48" data={schoolSuggestions} {...form.getInputProps('schools')} />
      <NumberInput className="m-4 w-48" label="Age" placeholder="Your age" mt="sm" {...form.getInputProps('age')} />
      <button className="m-4 border-4 border-blue-500 bg-blue-500 p-1 text-white">submit</button>
    </form>
  )
}
