import {rest} from 'msw'
import {STATUS_CODES} from '@/constants/messages'
import {resume} from '@/tests/data/Resume'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'
import {errorResolver, successResolver} from '@/tests/server/helper'
import {delayedResponse} from '@/tests/server/utils'

/**
 * レジュメ関連のリクエストハンドラー(GET)
 */
export const resumeGetHandlers = [
  rest.get(`${API_URL}${RESUME_URL.RESUME_ME}`, (req, res, ctx) =>
    delayedResponse(ctx.status(STATUS_CODES.OK), ctx.json(resume))
  ),
]

/**
 * レジュメ関連のリクエストハンドラー(PUT)
 */
export const resumePutHandlers = [rest.put(`${API_URL}${RESUME_URL.EDUCATION_PUT}`, successResolver())]

/**
 * レジュメ関連のリクエストハンドラー(エラー発生想定)
 */
export const resumePutErrorHandlers = [rest.put(`${API_URL}${RESUME_URL.EDUCATION_PUT}`, errorResolver())]
