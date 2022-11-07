import {createQueryKeys, mergeQueryKeys} from '@lukemorales/query-key-factory'

const masterKeys = createQueryKeys('master', {
  schools: null,
})

const resumeKeys = createQueryKeys('resume')

export const queryKeys = mergeQueryKeys(masterKeys, resumeKeys)
