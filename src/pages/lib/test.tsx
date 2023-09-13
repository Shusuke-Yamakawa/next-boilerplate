/* eslint-disable import/order */
/* eslint-disable func-style */
import {useState, useRef} from 'react'
import {useForm, zodResolver} from '@mantine/form'
import {TextInput, useMantineTheme} from '@mantine/core'
import {z} from 'zod'

const schema = z.object({
  name: z.string().min(2, {message: 'Name should have at least 2 letters'}).trim(),
  email: z.string().email({message: 'Invalid email'}),
  phone: z.string().max(100, {message: '最大文字数エラー'}),
})

function MyForm() {
  const theme = useMantineTheme()
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)

  const form = useForm({
    initialValues: {name: '', email: '', phone: ''},
    validate: zodResolver(schema),
  })

  const handleButtonClick = () => {
    const errorField = Object.keys(form.errors).find(fieldName => form.errors[fieldName])
    const errorFieldRef =
      errorField === 'name' ? nameRef.current : errorField === 'email' ? emailRef.current : phoneRef.current
    if (errorField) {
      errorFieldRef.scrollIntoView({behavior: 'smooth', block: 'center'})
      errorFieldRef.focus()
    }
  }

  return (
    <>
      <form
        onSubmit={form.onSubmit(
          values => console.log(values),
          () => handleButtonClick()
        )}
      >
        <TextInput
          label="名前"
          placeholder="名前を入力してください"
          required
          {...form.getInputProps('name')}
          error={form.errors.name}
          style={{marginBottom: theme.spacing.xs}}
          ref={nameRef}
        />
        <TextInput
          label="メールアドレス"
          placeholder="example@example.com"
          required
          {...form.getInputProps('email')}
          error={form.errors.email}
          style={{marginBottom: theme.spacing.xs}}
          ref={emailRef}
        />
        <TextInput
          className="mt-96"
          label="電話番号"
          placeholder="00000000000"
          required
          {...form.getInputProps('phone')}
          error={form.errors.phone}
          style={{marginBottom: theme.spacing.xs}}
          ref={phoneRef}
        />
        <button className="mt-96" type="submit">
          送信
        </button>
        <div className="mt-48">空白</div>
      </form>
    </>
  )
}

export default MyForm
