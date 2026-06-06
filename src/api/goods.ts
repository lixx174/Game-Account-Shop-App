import request from '@/utils/request'
import type {
  ServerResult,
  ServerPageReply,
  ServerGameAccountPageDto,
  ServerGameAccountDetailDto,
  ServerGameAccountPageQuery
} from '@/types/server'

/** 获取商品列表（某游戏下的账号列表） */
export function getGoodsList(
  gameId: string,
  params?: Record<string, any>
): Promise<ServerResult<ServerPageReply<ServerGameAccountPageDto>>> {
  const query: ServerGameAccountPageQuery = {
    current: params?.current || 1,
    size: params?.size || 20,
    gameId: Number(gameId),
    ...params
  }
  return request.get('/game-account/page', { params: query })
}

/** 获取商品详情（账号详情） */
export function getGoodsDetail(
  goodsId: string
): Promise<ServerResult<ServerGameAccountDetailDto>> {
  return request.get(`/game-account/${goodsId}`)
}
