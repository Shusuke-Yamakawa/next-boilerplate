import {rest} from 'msw'
import {STATUS_CODES} from '@/constants/messages'
import {masterSchools} from '@/tests/data/Resume/Education'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'
import {delayedResponse} from '@/tests/server/utils'

/**
 * マスタ取得のリクエストハンドラー
 */
export const masterHandlers = [
  rest.get(`${API_URL}${RESUME_URL.MASTER_SCHOOL}`, (req, res, ctx) =>
    delayedResponse(ctx.status(STATUS_CODES.OK), ctx.json({items: masterSchools}))
  ),
]
