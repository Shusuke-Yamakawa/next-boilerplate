import {QueryClient, type DefaultOptions, QueryCache, MutationCache} from '@tanstack/react-query'
import {AxiosError} from 'axios'
// import {apiErrorHandling} from '@/utils/api.util'

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    suspense: true,
  },
}

/**
 * React Queryに共通で適用するオプション
 */
export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
  // queryCache: new QueryCache({
  //   onError: (error): void => {
  //     if (error instanceof AxiosError) console.log(error)
  //   },
  // }),
  // mutationCache: new MutationCache({
  //   onError: (error, _, __, mutation): void => {
  //     if (mutation.meta?.shouldHandleGlobalError && error instanceof AxiosError) apiErrorHandling(error)
  //   },
  // }),
})
