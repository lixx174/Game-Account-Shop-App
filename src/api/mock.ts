/**
 * Mock 数据层
 * 开发阶段直接返回 mock 数据，不发起真实请求
 * 后续接入真实接口时：
 * 1. 修改 stores 中的导入，从 @/api/mock 改为 @/api/game 和 @/api/goods
 * 2. 或者修改 request.ts 的 baseURL 为真实后端地址
 */

import { mockGames, mockGoodsList, mockGoodsDetail } from './mockData'

// 延迟模拟网络请求
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// ========== 游戏相关接口 ==========

/** 获取首页热门游戏 */
export async function getHotGames() {
  await delay(300)
  return {
    code: 200,
    data: mockGames.slice(0, 15),
    message: 'success'
  }
}

/** 获取全部游戏（按字母分组） */
export async function getAllGames() {
  await delay(300)
  return {
    code: 200,
    data: mockGames,
    message: 'success'
  }
}

/** 搜索游戏 */
export async function searchGames(keyword: string) {
  await delay(200)
  const filtered = mockGames.filter(
    (g) => g.name.includes(keyword) || g.pinyin?.includes(keyword.toLowerCase())
  )
  return {
    code: 200,
    data: filtered,
    message: 'success'
  }
}

// ========== 商品相关接口 ==========

/** 获取某游戏下的商品列表 */
export async function getGoodsList(gameId: string, _params?: Record<string, any>) {
  await delay(400)
  const list = mockGoodsList[gameId] || []
  return {
    code: 200,
    data: list,
    message: 'success'
  }
}

/** 获取商品详情 */
export async function getGoodsDetail(goodsId: string) {
  await delay(300)
  const detail = mockGoodsDetail[goodsId]
  return {
    code: 200,
    data: detail || null,
    message: 'success'
  }
}
