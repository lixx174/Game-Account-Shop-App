import request from '@/utils/request'
import type {
  ServerResult,
  ServerPageReply,
  ServerGameDictionaryPickerDto,
  ServerGameDictionaryPickerQuery
} from '@/types/server'

/**
 * 获取字典下拉列表（区服、系统等）
 * @param gameId 游戏ID
 * @param gameDictionary 字典类型（如 'ORIGIN'、'SYSTEM' 等）
 */
export function getDictionaryPicker(
  gameId: string,
  gameDictionary: string
): Promise<ServerResult<ServerPageReply<ServerGameDictionaryPickerDto>>> {
  const query: ServerGameDictionaryPickerQuery = {
    current: 1,
    size: 1000,
    gameId,
    gameDictionary
  }
  return request.get('/game-dictionary/picker', { params: query })
}
