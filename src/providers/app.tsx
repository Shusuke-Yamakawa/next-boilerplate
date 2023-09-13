import {MantineProvider} from '@mantine/core'
import {DatesProvider} from '@mantine/dates'
import {ModalsProvider} from '@mantine/modals'
import {Notifications} from '@mantine/notifications'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import {useAtomsDevtools} from 'jotai/devtools'
import {theme} from '@/libs/mantine'
import {queryClient} from '@/libs/react-query'
import 'dayjs/locale/ja'

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
export const AppProvider = ({children}: AppProviderProps): JSX.Element => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <DatesProvider settings={{locale: 'ja'}}>
        <Notifications position="top-center" />
        <AtomsDevtools>
          <ModalsProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ModalsProvider>
        </AtomsDevtools>
      </DatesProvider>
    </MantineProvider>
  )
}
