import request from '@/utils/request'
import type { GameItem } from './mockData'

/** 获取首页热门游戏 */
export function getHotGames(): Promise<{ code: number; data: GameItem[]; message: string }> {
  return request.get('/games/hot')
}

/** 获取全部游戏 */
export function getAllGames(): Promise<{ code: number; data: GameItem[]; message: string }> {
  return request.get('/games/all')
}

/** 搜索游戏 */
export function searchGames(keyword: string): Promise<{ code: number; data: GameItem[]; message: string }> {
  return request.get('/games/search', { params: { keyword } })
}
