<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoodsStore } from '@/stores/goods'
import { useGameStore } from '@/stores/game'

const route = useRoute()
const router = useRouter()
const goodsStore = useGoodsStore()
const gameStore = useGameStore()

const gameId = route.params.gameId as string
const game = gameStore.hotGames.find((g) => g.id === gameId)

onMounted(() => {
  goodsStore.fetchGoodsList(gameId)
})

function goBack() {
  router.back()
}

function goDetail(goodsId: string) {
  router.push(`/goods-detail/${goodsId}`)
}

function handleCopy(title: string, id: string) {
  const text = `${title} - 商品ID: ${id}`
  navigator.clipboard.writeText(text).then(() => {
    alert('复制成功')
  }).catch(() => {
    // 降级方案
    const input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    alert('复制成功')
  })
}
</script>

<template>
  <div class="goods-list-page">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <span class="nav-back" @click="goBack">&lt;</span>
      <div class="nav-game">
        <img v-if="game" class="nav-game-icon" :src="game.icon" :alt="game.name" />
        <span class="nav-game-name">{{ game?.name || '商品列表' }}</span>
      </div>
      <span class="nav-share">↗</span>
    </div>

    <!-- 搜索框 -->
    <div class="search-section">
      <div class="search-input-box">
        <span class="search-icon">🔍</span>
        <input class="search-input" type="text" placeholder="请输入关键词查找" />
        <button class="search-btn">搜索</button>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-bar">
      <div class="filter-item">客户端 ▼</div>
      <div class="filter-item">安卓 ▼</div>
      <div class="filter-item">排序 ▼</div>
      <div class="filter-item">筛选 ▼</div>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <div v-if="goodsStore.loading" class="loading-text">加载中...</div>
      <template v-else>
        <div
          v-for="item in goodsStore.goodsList"
          :key="item.id"
          class="goods-card"
          @click="goDetail(item.id)"
        >
          <!-- 标题 -->
          <div class="goods-title">{{ item.title }}</div>

          <div class="goods-body">
            <!-- 左侧图片 -->
            <div class="goods-image-wrap">
              <img class="goods-image" :src="item.images[0]" :alt="item.title" />
              <span v-if="item.images.length > 1" class="image-count">{{ item.images.length }}图</span>
            </div>

            <!-- 右侧信息 -->
            <div class="goods-info">
              <div class="info-row">
                <span class="info-item">{{ item.platform }}</span>
                <span class="info-sep">|</span>
                <span class="info-item">{{ item.server }}</span>
              </div>

              <div class="goods-tags">
                <span v-for="tag in item.tags" :key="tag" class="goods-tag">{{ tag }}</span>
              </div>

              <div class="goods-price">¥{{ item.price.toFixed(2) }}</div>

              <div class="goods-actions">
                <button class="action-btn copy-btn" @click.stop="handleCopy(item.title, item.id)">
                  一键复制
                </button>
                <button class="action-btn contact-btn" @click.stop>
                  💬 网站唯一咨询客服
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="goodsStore.goodsList.length === 0" class="empty-text">
          暂无商品
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.goods-list-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
}

.nav-back {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  width: 24px;
}

.nav-game {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-game-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
}

.nav-game-name {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
}

.nav-share {
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  width: 24px;
  text-align: right;
}

.search-section {
  padding: 10px 16px;
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
}

.search-input-box {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
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

.search-btn {
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 6px 16px;
  font-size: 14px;
  cursor: pointer;
}

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.filter-item {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.goods-list {
  padding: 10px 12px;
}

.goods-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
}

.goods-title {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-body {
  display: flex;
  gap: 10px;
}

.goods-image-wrap {
  position: relative;
  flex-shrink: 0;
}

.goods-image {
  width: 100px;
  height: 75px;
  border-radius: 6px;
  object-fit: cover;
}

.image-count {
  position: absolute;
  bottom: 4px;
  left: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}

.info-sep {
  color: #ddd;
}

.goods-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.goods-tag {
  font-size: 11px;
  color: #00b4db;
  border: 1px solid #00b4db;
  padding: 1px 6px;
  border-radius: 3px;
}

.goods-price {
  font-size: 16px;
  font-weight: bold;
  color: #ff4d4f;
}

.goods-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}

.action-btn {
  border: none;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
}

.copy-btn {
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
  color: #fff;
}

.contact-btn {
  background-color: #e6f7ff;
  color: #0083b0;
}

.loading-text,
.empty-text {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 40px;
}
</style>
