import {createQueryKeys, mergeQueryKeys} from '@lukemorales/query-key-factory'
import {Api} from 'tabler-icons-react'

const masterKeys = createQueryKeys('master', {
  schools: (q: string) => ({queryKey: [q], queryFn: () => {}}),
})

const resumeKeys = createQueryKeys('resume')

export const queryKeys = mergeQueryKeys(masterKeys, resumeKeys)
