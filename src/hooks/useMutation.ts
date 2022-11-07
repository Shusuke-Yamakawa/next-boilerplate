import {type MutationFunction, useMutation, type UseMutationResult} from '@tanstack/react-query'
import {type AxiosError, type AxiosResponse} from 'axios'

export type UseMutateReturnType<TData, TVariables> = UseMutationResult<
  AxiosResponse<TData, any>,
  AxiosError<TData, any>,
  TVariables,
  unknown
>

/**
 * useMutationを使用してデータを取得する
 *
 * @param mutationFunction 更新API定義
 *  - TData     : mutationが返すデータの型
 *  - TVariables: mutate関数の変数の型
 * @param shouldHandleGlobalError グローバルエラーハンドリングを使用するか
 *  リクエストごとに個別でエラーハンドリングしたい場合はfalseにし、mutateにonError関数を渡す
 *  ```typescript
 *  const {mutate} = useMutate(() => somePromise(), false)
 *  mutate(params, {
 *    onError: error => doSomething()
 *  })
 *  ```
 *  https://github.com/TanStack/query/discussions/3125
 * @return useMutationの戻り値(mutateAsyncはカスタムした形を返却)
 *
 * @package
 */
export const useMutate = <TData, TVariables>(
  mutationFunction: MutationFunction<AxiosResponse<TData>, TVariables>,
  shouldHandleGlobalError = true
): UseMutateReturnType<TData, TVariables> => {
  const result = useMutation<AxiosResponse<TData>, AxiosError<TData>, TVariables>(mutationFunction, {
    meta: {
      shouldHandleGlobalError,
    },
  })
  return result
}
