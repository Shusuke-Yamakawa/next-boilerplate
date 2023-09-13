import {forwardRef, useRef, useState} from 'react'
import {
  Autocomplete,
  Avatar,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
  Text,
  rem,
} from '@mantine/core'
import {Calendar, DateInput, DatesProvider} from '@mantine/dates'
import {Dropzone, DropzoneProps, IMAGE_MIME_TYPE} from '@mantine/dropzone'
import {useForm, zodResolver} from '@mantine/form'
import {useDebouncedState} from '@mantine/hooks'
import {IconChevronDown} from '@tabler/icons'
import axios from 'axios'
import dayjs from 'dayjs'
import {z} from 'zod'
import {queryKeys} from '@/clients'
import {useFetch} from '@/hooks'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'

const schema = z.object({
  name: z.string().min(2, {message: 'Name should have at least 2 letters'}).trim(),
  email: z.string().email({message: 'Invalid email'}),
  text: z.string().max(100, {message: '最大文字数エラー'}),
  schools: z.string().min(2, {message: 'schools should have at least 2 letters'}),
  age: z.number().min(18, {message: 'You must be at least 18 to create an account'}),
  birthDay: z.date().optional().nullable(),
})

console.log('schema', zodResolver(schema))

export const MantineTest = () => {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: 'name',
      email: 'aaa@co.jp',
      text: 'テキストエリア',
      schools: '東京大学',
      age: 18,
      birthDay: new Date('2021-03-05'),
    },
    transformValues: values => {
      return {...values, birthDay: dayjs(values.birthDay).format('YYYY-MM-DD')}
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

  const multiSimpleData = [
    {value: 'react', label: 'React'},
    {value: 'ng', label: 'Angular'},
    {value: 'svelte', label: 'Svelte'},
    {value: 'vue', label: 'Vue'},
    {value: 'riot', label: 'Riot'},
    {value: 'next', label: 'Next.js'},
    {value: 'blitz', label: 'Blitz.js'},
  ]

  const [value, setValue] = useState<Date | null>(null)
  const openRef = useRef<() => void>(null)

  const [fileName, setFileName] = useState('')
  const handleDrop = (files: any) => {
    if (files.length > 0) {
      setFileName(files[0].name)
    } else {
      setFileName('')
    }
  }

  return (
    <form className="flex flex-col items-center" onSubmit={form.onSubmit(values => console.log(values))}>
      <TextInput className="m-4 w-48" label="Email" placeholder="example@mail.com" {...form.getInputProps('email')} />
      <TextInput className="m-4 w-48" label="Name" placeholder="John Doe" mt="sm" {...form.getInputProps('name')} />
      <Textarea autosize {...form.getInputProps('text')} />
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
      <Select
        data={['ReactReactReactReactReact', 'Angular', 'Svelte', 'Vue']}
        // rightSection={<IconChevronDown size={14} />}
        // rightSectionWidth={30}
        // styles={{rightSection: {pointerEvents: 'none'}}}
      />
      <MultiSelect
        data={multiSimpleData}
        label="Your favorite frameworks/libraries"
        placeholder="Pick all that you like"
      />
      <DateInput
        {...form.getInputProps('birthDay')}
        // value={value}
        // onChange={setValue}
        classNames={{weekdaysRow: 'border-b-4'}}
        minDate={new Date('1930-01-01')}
        maxDate={new Date()}
        label="Date input"
        placeholder="Date input"
        valueFormat="YYYY/MM/DD"
      />
      <Calendar monthLabelFormat={'YYYY MMMM'} />
      <Dropzone
        onDrop={handleDrop}
        accept={IMAGE_MIME_TYPE}
        sx={theme => ({
          minHeight: rem(120),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 0,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

          '&[data-accept]': {
            color: theme.white,
            backgroundColor: theme.colors.blue[6],
          },

          '&[data-reject]': {
            color: theme.white,
            backgroundColor: theme.colors.red[6],
          },
        })}
      >
        <Text align="center">{fileName ? `Selected file: ${fileName}` : 'Drop a file here'}</Text>
      </Dropzone>

      <button className="m-4 border-4 border-blue-500 bg-blue-500 p-1 text-white">submit</button>
    </form>
  )
}
