import {
  useQuery,
  type QueryKey,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import {type AxiosError, type AxiosResponse} from 'axios'

export type UseGetReturnType<T> = Omit<UseQueryResult<AxiosResponse<T, any>, AxiosError<unknown, any>>, 'data'> & {
  data: T
}

/**
 * useQueryを使用してデータを取得する
 *
 * @param key      キャッシュキー
 * @param queryFn  フェッチ定義
 * @param cacheInfinity trueにすることでcacheをInfinityにする
 * @param options  その他オプションの定義
 *
 * @return useQueryの戻り値
 *   dataに関してはdata.dataを返却
 *   suspenseモードを活用しており、エラーハンドリングも行っているため、戻り値のundefinedは除外している
 *
 * @package
 */
export const useFetch = <T>(
  key: QueryKey,
  queryFn: QueryFunction<AxiosResponse<T>>,
  cacheInfinity = false,
  options?: UseQueryOptions<AxiosResponse<T>, AxiosError>
): UseGetReturnType<T> => {
  const cacheTimeInfinity = cacheInfinity
    ? {
        cacheTime: Infinity,
        staleTime: Infinity,
      }
    : null
  const result = useQuery<AxiosResponse<T>, AxiosError, AxiosResponse<T>>(key, queryFn, {
    ...options,
    ...cacheTimeInfinity,
  })

  const {data: resp} = result
  return {...result, data: resp as T}
}
