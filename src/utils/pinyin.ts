import { pinyin } from 'pinyin-pro'

/**
 * 获取名称的首字母（用于游戏列表分组）
 * @param name 游戏名称
 * @returns 首字母（大写），无法识别返回 '#'
 */
export function getFirstLetter(name: string): string {
  if (!name) return '#'
  const first = name.charAt(0)
  // 英文字母直接返回大写
  if (/[a-zA-Z]/.test(first)) {
    return first.toUpperCase()
  }
  // 数字归为 '#'
  if (/[0-9]/.test(first)) {
    return '#'
  }
  // 中文转拼音取首字母
  try {
    const py = pinyin(first, { toneType: 'none' })
    return py.charAt(0).toUpperCase()
  } catch {
    return '#'
  }
}
