/**
 * サーバーエラー(システムエラ-)
 */
export const SYSTEM_ERROR_MESSAGE = {
  DEFAULT: 'エラーが発生しました',
  DETAIL: '時間を置いて再度実行してください',
} as const

/**
 * サーバーエラー（業務エラー)
 */
export const BUSINESS_ERROR_MESSAGE = {
  CONFLICT: '画面を開き直し、再度実行してください',
} as const

/**
 * サーバーエラー（エラーコード返却)
 */
export const SERVER_ERROR_MAP = [
  {code: 'FIELD_VALIDATION_VIOLATION', message: SYSTEM_ERROR_MESSAGE.DEFAULT},
  {code: 'BUSINESS_LOGIC_VIOLATION', message: SYSTEM_ERROR_MESSAGE.DEFAULT},
] as const

/**
 * HTTP Status Code
 */
export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

/**
 * バリデーション
 */
export const VALIDATION_ERROR_MESSAGE = {
  REQUIRED: `{0}が入力されていません`,
  REQUIRED_SELECT: `{0}を選択してください`,
  MAX_LENGTH: `{0}は{1}文字以内で入力してください`,
  MIN_YEAR: `{0}年以降を入力してください`,
  MAX_YEAR: `未来の年は入力できません`,
  MONTH_RANGE: '1月~12月の範囲で入力して下さい',
} as const

export const VALIDATION_ERROR_RULE = {
  MAX_LENGTH_TEXT_INPUT: 128,
  MIN_YEAR: 1930,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
} as const
