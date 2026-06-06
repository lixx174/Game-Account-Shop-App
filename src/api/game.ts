import request from '@/utils/request'
import type { ServerResult, ServerPageReply, ServerGamePageDto } from '@/types/server'

/** 获取首页热门游戏（取前15条） */
export function getHotGames(): Promise<ServerResult<ServerPageReply<ServerGamePageDto>>> {
  return request.get('/game/page', { params: { current: 1, size: 15 } })
}

/** 获取全部游戏（取前1000条，服务端无字母分组，前端自行计算） */
export function getAllGames(): Promise<ServerResult<ServerPageReply<ServerGamePageDto>>> {
  return request.get('/game/page', { params: { current: 1, size: 1000 } })
}

/** 搜索游戏（按名称模糊查询） */
export function searchGames(
  keyword: string
): Promise<ServerResult<ServerPageReply<ServerGamePageDto>>> {
  return request.get('/game/page', { params: { current: 1, size: 1000, name: keyword } })
}
