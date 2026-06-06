import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getHotGames, getAllGames, searchGames } from '@/api/mock'
import type { GameItem } from '@/api/mockData'

export const useGameStore = defineStore('game', () => {
  // State
  const hotGames = ref<GameItem[]>([])
  const allGames = ref<GameItem[]>([])
  const loading = ref(false)

  // Getters
  /** 按字母分组的游戏列表 */
  const groupedGames = computed(() => {
    const groups: Record<string, GameItem[]> = {}
    allGames.value.forEach((game) => {
      const letter = game.letter || '#'
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(game)
    })
    // 按字母排序
    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        letter,
        games: groups[letter]
      }))
  })

  // Actions
  async function fetchHotGames() {
    loading.value = true
    try {
      const res = await getHotGames()
      hotGames.value = res.data || []
    } finally {
      loading.value = false
    }
  }

  async function fetchAllGames() {
    loading.value = true
    try {
      const res = await getAllGames()
      allGames.value = res.data || []
    } finally {
      loading.value = false
    }
  }

  async function fetchSearchGames(keyword: string) {
    loading.value = true
    try {
      const res = await searchGames(keyword)
      allGames.value = res.data || []
    } finally {
      loading.value = false
    }
  }

  return {
    hotGames,
    allGames,
    loading,
    groupedGames,
    fetchHotGames,
    fetchAllGames,
    fetchSearchGames
  }
})