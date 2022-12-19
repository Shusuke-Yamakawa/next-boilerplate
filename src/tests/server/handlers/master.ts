import {rest} from 'msw'
import {STATUS_CODES} from '@/constants/messages'
import {masterSchools} from '@/tests/data/Resume/Education'
import {API_URL, RESUME_URL} from '@/tests/server/endpoint'
import {delayedResponse} from '@/tests/server/utils'
import {hiraganaToKatakana} from '@/utils/string.util'

/**
 * マスタ取得のリクエストハンドラー
 */
export const masterHandlers = [
  rest.get(`${API_URL}${RESUME_URL.MASTER_SCHOOL}`, (req, res, ctx) => {
    const q = req.url.searchParams.get('q')
    console.log(q)
    let schools = masterSchools
    if (q) {
      schools = schools.filter(
        school =>
          school.name.toLowerCase().includes(q.toLowerCase().trim()) ||
          school.kana.toLowerCase().includes(q.toLowerCase().trim()) ||
          school.kana.toLowerCase().includes(hiraganaToKatakana(q).toLowerCase().trim()) ||
          school.english.toLowerCase().includes(q.toLowerCase().trim())
      )
    }

    return delayedResponse(ctx.status(STATUS_CODES.OK), ctx.json({items: schools}))
  }),
]
