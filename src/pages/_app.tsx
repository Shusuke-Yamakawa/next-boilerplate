import '../styles/globals.css'

import {DatesProvider} from '@mantine/dates'
import dayjs from 'dayjs'
import {AppProvider} from '@/providers/app'
import {initMocks} from '@/tests/server'
import type {AppProps} from 'next/app'

initMocks()

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
