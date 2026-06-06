import request from '@/utils/request'

/** 获取商品列表 */
export function getGoodsList(
  gameId: string,
  params?: Record<string, any>
): Promise<{ code: number; data: any[]; message: string }> {
  return request.get(`/goods/list/${gameId}`, { params })
}

/** 获取商品详情 */
export function getGoodsDetail(goodsId: string): Promise<{ code: number; data: any; message: string }> {
  return request.get(`/goods/detail/${goodsId}`)
}
