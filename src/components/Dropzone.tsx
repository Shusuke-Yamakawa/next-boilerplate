import {forwardRef, useEffect, useRef, useState} from 'react'
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

const MAX_FILES = 3
// 5MBを許容する場合 5000000
const MAX_TOTAL_SIZE = 42000
const schema = z.object({
  files: z
    .array(z.any())
    .min(1, {message: 'ファイルを選択してください'})
    .refine(
      files => {
        let totalSize = 0

        for (let i = 0; i < files.length; i++) {
          totalSize += files[i].size
        }

        return totalSize <= MAX_TOTAL_SIZE
      },
      {message: 'ファイルサイズは合計5MBまでとしてください'}
    )
    .refine(
      files => {
        console.log('files', files)
        console.log('filesLength', files.length)

        return files.length <= MAX_FILES
      },
      {message: 'ファイルは最大4つまでにしてください'}
    ),
  // transformValuesで↓の形にする

  // items: z.object({
  //   file1: z.any().refine(file => file.length !== 0, {message: 'ファイルを選択してください'}),
  //   file2: z.any().nullable().optional(),
  //   file3: z.any().nullable().optional(),
  //   file4: z.any().nullable().optional(),
  // }),
})

// console.log('schema', zodResolver(schema))

export const DropzoneComponent = () => {
  const form = useForm({
    validate: zodResolver(schema),
    validateInputOnChange: true,
    initialValues: {
      files: [],
    },
  })

  console.log('formValues', form.values)

  console.log('formError', form.errors)

  const [fileName, setFileName] = useState('')
  const handleDrop = (files: any) => {
    console.log('files: ', files)
    // form.setFieldValue('files', [...form.values.files, ...files])
  }

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={form.onSubmit(
        values => console.log(values),
        validationMessage => console.log(validationMessage)
      )}
    >
      <Dropzone
        onDrop={handleDrop}
        // accept={IMAGE_MIME_TYPE}
        // maxSize={5000000}
        maxFiles={3}
        maxSize={MAX_TOTAL_SIZE}
        onReject={error => {
          console.log('onReject', error)
          error[0].errors[0].code === 'file-too-large' &&
            form.setFieldError('files', 'ファイルサイズは合計5MBまでとしてください')
        }}
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
        {form.values.files.length > 0 ? (
          <Text>
            {form.values.files.map((file: any, index) => (
              <Text key={`${file.name}_${index}`}>{file.name}</Text>
            ))}
          </Text>
        ) : (
          <Text align="center">{'Drop a file here'}</Text>
        )}
      </Dropzone>
      {!form.isValid() && <div style={{color: 'red'}}>{form.getInputProps('files').error}</div>}
      <button className="m-4 border-4 border-blue-500 bg-blue-500 p-1 text-white">submit</button>
    </form>
  )
}
