import {createResponseComposition, context} from 'msw'
import {STATUS_CODES} from '@/constants/messages'
import type {AxiosError, AxiosResponse} from 'axios'

const isTesting =
  process.env.NODE_ENV === 'test' ||
  (typeof window !== 'undefined' && ((window as any).Cypress || (window as any).IS_STORYBOOK))

/**
 * テスト環境で実行された場合、レスポンスを遅延返却する
 */
export const delayedResponse = createResponseComposition(undefined, [context.delay(isTesting ? 0 : 1000)])

type Status = typeof STATUS_CODES[keyof typeof STATUS_CODES]

/**
 * APIエラーレスポンスを作成する
 *
 * @param data   レスポンスデータ
 * @param status レスポンスに設定するステータスコード
 * @param code   リクエストのステータスコード
 * @return       エラーレスポンス
 *
 */
export const makeError = (data: object, status: Status, code = ''): AxiosError => ({
  code: code,
  request: {},
  response: makeResponse(data, status),
  config: {},
  isAxiosError: true,
  name: '',
  message: '',
  toJSON: () => ({}),
})

/**
 * APIレスポンスを作成する
 *
 * @param data   レスポンスデータ
 * @param status レスポンスに設定するステータスコード
 * @return       レスポンス
 *
 */
export const makeResponse = (data: object, status: Status = STATUS_CODES.OK): AxiosResponse => ({
  data,
  status,
  headers: {'content-type': 'application/json'},
  statusText: 'success',
  config: {},
})
