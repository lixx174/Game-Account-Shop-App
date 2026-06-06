import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getHotGames, getAllGames, searchGames } from '@/api/game'
import type { GameItem } from '@/api/mockData'
import { getFirstLetter } from '@/utils/pinyin'

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
  /** 将服务端 GamePageDto 映射为前端 GameItem */
  function mapGameDto(dto: { id: number; name: string; icon: string }): GameItem {
    return {
      id: String(dto.id),
      name: dto.name,
      icon: dto.icon,
      letter: getFirstLetter(dto.name)
    }
  }

  async function fetchHotGames() {
    loading.value = true
    try {
      const res = await getHotGames()
      hotGames.value = (res.data?.records || []).map(mapGameDto)
    } finally {
      loading.value = false
    }
  }

  async function fetchAllGames() {
    loading.value = true
    try {
      const res = await getAllGames()
      allGames.value = (res.data?.records || []).map(mapGameDto)
    } finally {
      loading.value = false
    }
  }

  async function fetchSearchGames(keyword: string) {
    loading.value = true
    try {
      const res = await searchGames(keyword)
      allGames.value = (res.data?.records || []).map(mapGameDto)
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
