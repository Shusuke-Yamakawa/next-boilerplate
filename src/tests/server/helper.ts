import {SERVER_ERROR_MAP, STATUS_CODES} from '@/constants/messages'
import {delayedResponse} from '@/tests/server/utils'
import type {PathParams, ResponseResolver, RestContext, RestRequest} from 'msw'

type SuccessResolverArgs = {
  status?: number
  message?: string
}

/**
 * 正常汎用レスポンス
 *
 * @param status HTTPレスポンスコード
 * @param message 返却されたメッセージ
 * @return レスポンス
 */
export const successResolver =
  ({status = STATUS_CODES.OK, message = 'success'}: SuccessResolverArgs = {}): ResponseResolver<
    RestRequest<any, PathParams<string>>,
    RestContext
  > =>
  (req, res, ctx) =>
    delayedResponse(
      ctx.status(status),
      ctx.json({
        message: message,
      })
    )

type ErrorResolverArgs = {
  status?: number
  errors?: {code: string}[]
}

/**
 * エラー汎用レスポンス
 *
 * @param status HTTPレスポンスコード
 * @param errors 返却されたエラーコード
 * @return レスポンス
 */
export const errorResolver =
  ({
    status = STATUS_CODES.BAD_REQUEST,
    errors = [{code: SERVER_ERROR_MAP[0].code}, {code: SERVER_ERROR_MAP[1].code}],
  }: ErrorResolverArgs = {}): ResponseResolver<RestRequest<any, PathParams<string>>, RestContext> =>
  (req, res, ctx) =>
    delayedResponse(
      ctx.status(status),
      ctx.json({
        errors,
      })
    )
