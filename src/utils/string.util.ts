/**
 * ひらがなをカタカナに変換する
 *
 * @param text ひらがな
 * @return カタカナ
 */
export const hiraganaToKatakana = (text: string): string =>
  text.replace(/[ぁ-ん]/g, m => String.fromCharCode(m.charCodeAt(0) + 0x60))

/**
 * カタカナをひらがなに変換する
 *
 * @param text カタカナ
 * @return ひらがな
 */
export const katakanaToHiragana = (text: string): string =>
  text.replace(/[ァ-ン]/g, m => String.fromCharCode(m.charCodeAt(0) - 0x60))

/**
 * 引数に渡されたメッセージ定数をフォーマットする
 *
 * @param message メッセージ定数
 * @param args メッセージに当て込む文字配列
 * [例]
 *  message：{0}が入力されていません
 *  args：学校名
 * @return フォーマットされたメッセージ
 */

export const messageFormat = (message: string, ...args: string[]): string => {
  const newMessage = message.replace(/\{(\d+)\}/g, (_, k) => args[k])
  return newMessage
}
