/**
 * API Fetch HookのベースとなるreturnType
 */
export type BaseFetchHookReturnType<TData> = {
  data: TData
}

/**
 * API Mutation HookのベースとなるreturnType
 */
export type BaseMutationHookReturnType<TData> = BaseFetchHookReturnType<TData> & {
  isMutating: boolean
  // TODO mutate を返すようにしたほうがいいかも
}
