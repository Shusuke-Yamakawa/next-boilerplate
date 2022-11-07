import {handlers} from './handlers'

/**
 * mswをサーバサイドで実行する際に活用
 *  - server.listen()で起動する
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const server = require('msw/node').setupServer(...handlers)
