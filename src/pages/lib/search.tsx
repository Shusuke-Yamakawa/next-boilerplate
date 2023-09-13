import {useState} from 'react'
import {Autocomplete, NumberInput, TextInput} from '@mantine/core'
import {useForm, zodResolver} from '@mantine/form'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {z} from 'zod'
import {queryKeys} from '@/clients'
import {useFetch} from '@/hooks'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'

export default function Search() {
  const [keyword, setKeyword] = useState('')
  const {data} = useQuery(
    ['bookData', keyword],
    () => axios.get(`https://www.googleapis.com/books/v1/volumes?q=search+${keyword}`).then(res => res.data),
    {enabled: keyword !== undefined}
  )

  return (
    <>
      <input placeholder="検索ワードを入力してください" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <div>
        <h1>検索ワードにヒットしたデータ：</h1>
        {data && data.items.map((item: any) => <p key={item.id}>{item.id}</p>)}
      </div>
    </>
  )
}
