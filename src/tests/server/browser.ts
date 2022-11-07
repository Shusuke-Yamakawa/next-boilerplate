import {handlers} from './handlers'

/**
 * mswをクライアントサイドで実行する際に活用
 *  - worker.start()で起動する
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const worker = require('msw').setupWorker(...handlers)
