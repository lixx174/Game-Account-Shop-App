import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGoodsList, getGoodsDetail } from '@/api/goods'
import type { GoodsItem, GoodsDetail } from '@/api/mockData'
import type { ServerGameAccountPageDto, ServerGameAccountDetailDto } from '@/types/server'

export const useGoodsStore = defineStore('goods', () => {
  // State
  const goodsList = ref<GoodsItem[]>([])
  const goodsDetail = ref<GoodsDetail | null>(null)
  const loading = ref(false)
  /** 当前浏览的商品所属游戏ID（详情页需要） */
  const currentGameId = ref('')

  // Actions

  /** 将服务端账号分页DTO映射为前端 GoodsItem */
  function mapGoodsItem(dto: ServerGameAccountPageDto, gameId: string): GoodsItem {
    return {
      id: String(dto.id),
      gameId,
      title: dto.title,
      price: dto.price,
      images: dto.img ? [dto.img] : [],
      tags: dto.tags || [],
      platform: dto.originName || '',
      server: dto.serverName || '',
      level: '', // 服务端暂无该字段
      updateTime: '-', // 服务端暂无该字段
      wantCount: 0, // 服务端暂无该字段
      systemName: dto.systemName || ''
    }
  }

  /** 将服务端账号详情DTO映射为前端 GoodsDetail */
  function mapGoodsDetail(dto: ServerGameAccountDetailDto, gameId: string): GoodsDetail {
    const params = [
      { label: '游戏名称', value: dto.title },
      { label: '客户端', value: dto.originName || '' },
      { label: '系统', value: dto.systemName || '' },
      { label: '服务器', value: dto.serverName || '' },
      { label: '游戏进度', value: dto.process || '' },
      { label: '交易政策', value: dto.policy || '' },
      { label: '备注', value: dto.remark || '' }
    ].filter((p) => p.value)

    return {
      id: String(dto.id),
      gameId,
      gameName: '', // 由调用方从 gameStore 补充
      title: dto.title,
      price: dto.price,
      images: dto.images || [],
      tags: [], // 详情接口不返回 tags
      params,
      updateTime: dto.createAt || '-',
      wantCount: 0 // 服务端暂无该字段
    }
  }

  async function fetchGoodsList(gameId: string, params?: Record<string, any>) {
    loading.value = true
    currentGameId.value = gameId
    try {
      const res = await getGoodsList(gameId, params)
      goodsList.value = (res.data?.records || []).map((dto) => mapGoodsItem(dto, gameId))
    } finally {
      loading.value = false
    }
  }

  async function fetchGoodsDetail(goodsId: string) {
    loading.value = true
    try {
      const res = await getGoodsDetail(goodsId)
      const dto = res.data
      if (!dto) {
        goodsDetail.value = null
        return
      }
      goodsDetail.value = mapGoodsDetail(dto, currentGameId.value)
    } finally {
      loading.value = false
    }
  }

  return {
    goodsList,
    goodsDetail,
    loading,
    currentGameId,
    fetchGoodsList,
    fetchGoodsDetail
  }
})
