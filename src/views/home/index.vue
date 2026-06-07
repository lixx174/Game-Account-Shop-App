<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import GameCard from '@/components/GameCard.vue'
import type { GameItem } from '@/api/mockData'

const router = useRouter()
const gameStore = useGameStore()

onMounted(() => {
  gameStore.fetchHotGames()
})

function handleGameClick(game: GameItem) {
  router.push(`/goods-list/${game.id}`)
}

function handleSearchClick() {
  router.push({ path: '/games', query: { focus: '1' } })
}
</script>

<template>
  <div class="home-page">
    <!-- 头部渐变区域 -->
    <div class="home-header">
      <div class="header-content">
        <h1 class="header-title">卿豪网络,你想要的，这里都有</h1>
        <p class="header-subtitle">担保交易·累计交易超过106592单</p>

        <!-- 搜索框 -->
        <div class="search-box" @click="handleSearchClick">
          <span class="search-icon">🔍</span>
          <span class="search-placeholder">输入游戏名称</span>
          <button class="search-btn">搜索</button>
        </div>

        <!-- 热门搜索 -->
        <!-- <div class="hot-tags">
          <span class="hot-tag-icon">🔥</span>
          <span class="hot-tag-text">向僵尸开炮</span>
        </div> -->
      </div>
    </div>

    <!-- 热门游戏 -->
    <div class="hot-games">
      <div class="section-title">热门游戏</div>
      <div v-if="gameStore.loading" class="loading-text">加载中...</div>
      <div v-else class="games-grid">
        <GameCard
          v-for="game in gameStore.hotGames"
          :key="game.id"
          :game="game"
          @click="handleGameClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.home-header {
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
  padding: 20px 16px 30px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0;
}

.header-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 8px 12px;
  gap: 8px;
}

.search-icon {
  font-size: 16px;
  color: #999;
}

.search-placeholder {
  flex: 1;
  font-size: 14px;
  color: #999;
}

.search-btn {
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
}

.hot-tags {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hot-tag-icon {
  font-size: 14px;
}

.hot-tag-text {
  font-size: 13px;
  color: #fff;
}

.hot-games {
  background-color: #fff;
  margin-top: 10px;
  padding: 16px;
  border-radius: 12px 12px 0 0;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.loading-text {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 20px;
}
</style>
