import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useAtomsDevtools} from 'jotai/devtools'
import {theme} from '@/libs/mantine'
import {queryClient} from '@/libs/react-query'

type AtomsProviderProps = {
  children: JSX.Element
}

const AtomsDevtools = ({children}: AtomsProviderProps): JSX.Element => {
  useAtomsDevtools('devtool')
  return children
}

type AppProviderProps = {
  children: React.ReactNode
}

/**
 * アプリ全体に適用させるプロバイダー
 *  Note: ErrorBoundaryはLayoutに適用させている（ロジックがあるページは全てlayout配下になる想定)
 */
export const AppProvider = ({children}: AppProviderProps): JSX.Element => (
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <NotificationsProvider position="top-center">
      <AtomsDevtools>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AtomsDevtools>
    </NotificationsProvider>
  </MantineProvider>
)
