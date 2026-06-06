import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getGoodsList, getGoodsDetail } from '@/api/mock'
import type { GoodsItem, GoodsDetail } from '@/api/mockData'

export const useGoodsStore = defineStore('goods', () => {
  // State
  const goodsList = ref<GoodsItem[]>([])
  const goodsDetail = ref<GoodsDetail | null>(null)
  const loading = ref(false)

  // Actions
  async function fetchGoodsList(gameId: string, params?: Record<string, any>) {
    loading.value = true
    try {
      const res = await getGoodsList(gameId, params)
      goodsList.value = res.data || []
    } finally {
      loading.value = false
    }
  }

  async function fetchGoodsDetail(goodsId: string) {
    loading.value = true
    try {
      const res = await getGoodsDetail(goodsId)
      goodsDetail.value = res.data || null
    } finally {
      loading.value = false
    }
  }

  return {
    goodsList,
    goodsDetail,
    loading,
    fetchGoodsList,
    fetchGoodsDetail
  }
})
