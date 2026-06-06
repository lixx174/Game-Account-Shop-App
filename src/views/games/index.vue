<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import GameCard from '@/components/GameCard.vue'
import type { GameItem } from '@/api/mockData'

const route = useRoute()
const router = useRouter()
const gameStore = useGameStore()
const searchKeyword = ref('')
const activeLetter = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  gameStore.fetchAllGames()
  // 如果从首页搜索跳转过来，自动聚焦搜索框
  if (route.query.focus === '1') {
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 300)
  }
})

// 所有字母（从分组中提取）
const letters = computed(() => {
  return gameStore.groupedGames.map((g) => g.letter)
})

// 过滤后的分组
const filteredGroups = computed(() => {
  if (!searchKeyword.value.trim()) return gameStore.groupedGames
  const keyword = searchKeyword.value.trim().toLowerCase()
  return gameStore.groupedGames
    .map((group) => ({
      ...group,
      games: group.games.filter(
        (g) => g.name.includes(keyword) || (g.pinyin && g.pinyin.includes(keyword))
      )
    }))
    .filter((group) => group.games.length > 0)
})

function handleGameClick(game: GameItem) {
  router.push(`/goods-list/${game.id}`)
}

function handleSearch() {
  // 搜索已实时响应，此方法可用于触发接口搜索
  if (searchKeyword.value.trim()) {
    gameStore.fetchSearchGames(searchKeyword.value.trim())
  } else {
    gameStore.fetchAllGames()
  }
}

function scrollToLetter(letter: string) {
  activeLetter.value = letter
  const el = document.getElementById(`letter-${letter}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="games-page">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <span class="nav-back" @click="goBack"><</span>
      <span class="nav-title">全部游戏</span>
      <span class="nav-share">↗</span>
    </div>

    <!-- 搜索框 -->
    <div class="search-section">
      <div class="search-input-box">
        <span class="search-icon">🔍</span>
        <input
          ref="searchInputRef"
          v-model="searchKeyword"
          class="search-input"
          type="text"
          placeholder="搜索游戏名称"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>

    <!-- 游戏列表 -->
    <div class="games-list">
      <div v-if="gameStore.loading" class="loading-text">加载中...</div>
      <template v-else>
        <div
          v-for="group in filteredGroups"
          :id="`letter-${group.letter}`"
          :key="group.letter"
          class="letter-group"
        >
          <div class="letter-title">{{ group.letter }}</div>
          <div class="games-grid">
            <GameCard
              v-for="game in group.games"
              :key="game.id"
              :game="game"
              @click="handleGameClick"
            />
          </div>
        </div>
        <div v-if="filteredGroups.length === 0" class="empty-text">
          未找到相关游戏
        </div>
      </template>
    </div>

    <!-- 字母索引 -->
    <div class="letter-index">
      <div
        v-for="letter in letters"
        :key="letter"
        :class="['index-item', { active: activeLetter === letter }]"
        @click="scrollToLetter(letter)"
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.games-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
}

.nav-back {
  font-size: 20px;
  color: #333;
  cursor: pointer;
  width: 24px;
}

.nav-title {
  font-size: 17px;
  font-weight: 500;
  color: #333;
}

.nav-share {
  font-size: 18px;
  color: #666;
  cursor: pointer;
  width: 24px;
  text-align: right;
}

.search-section {
  padding: 8px 16px 12px;
  background-color: #fff;
}

.search-input-box {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 18px;
  padding: 8px 12px;
  gap: 8px;
}

.search-icon {
  font-size: 14px;
  color: #999;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
}

.search-input::placeholder {
  color: #ccc;
}

.games-list {
  padding: 0 16px 20px;
}

.letter-group {
  margin-bottom: 8px;
}

.letter-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  padding: 12px 0 8px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.letter-index {
  position: fixed;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 4px 2px;
}

.index-item {
  font-size: 11px;
  color: #666;
  padding: 2px 4px;
  cursor: pointer;
}

.index-item.active {
  color: #0083b0;
  font-weight: bold;
}

.loading-text,
.empty-text {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 40px;
}
</style>
