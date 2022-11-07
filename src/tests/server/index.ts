/**
 * mswを起動させる
 */
/* eslint-disable @typescript-eslint/no-var-requires */
export const initMocks = (): void => {
  // Next.jsはクライアントサイドでもサーバサイドでも実行されるため、双方の考慮を入れる
  if (typeof window === 'undefined') {
    const {server} = require('./server')
    server.listen()
  } else {
    const {worker} = require('./browser')
    worker.start()
  }
}
