<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoodsStore } from '@/stores/goods'
import { useGameStore } from '@/stores/game'

const route = useRoute()
const router = useRouter()
const goodsStore = useGoodsStore()
const gameStore = useGameStore()

const goodsId = route.params.goodsId as string
const showAllParams = ref(false)

onMounted(() => {
  goodsStore.fetchGoodsDetail(goodsId)
})

const game = gameStore.hotGames.find((g) => g.id === goodsStore.goodsDetail?.gameId)

function goBack() {
  router.back()
}

function handleCopy(id: string) {
  navigator.clipboard.writeText(id).then(() => {
    alert('商品ID复制成功')
  }).catch(() => {
    const input = document.createElement('input')
    input.value = id
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    alert('商品ID复制成功')
  })
}
</script>

<template>
  <div class="goods-detail-page">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <span class="nav-back" @click="goBack">&lt;</span>
      <div class="nav-game">
        <img v-if="game" class="nav-game-icon" :src="game.icon" :alt="game?.name" />
        <span class="nav-game-name">{{ game?.name || '商品详情' }}</span>
      </div>
      <span class="nav-share">↗</span>
    </div>

    <!-- 截图轮播 -->
    <div v-if="goodsStore.goodsDetail" class="screenshot-section">
      <div class="screenshot-scroll">
        <img
          v-for="(img, idx) in goodsStore.goodsDetail.images"
          :key="idx"
          class="screenshot-img"
          :src="img"
          alt="游戏截图"
        />
      </div>
    </div>

    <!-- 价格信息 -->
    <div v-if="goodsStore.goodsDetail" class="price-section">
      <div class="price-row">
        <span class="price-symbol">¥</span>
        <span class="price-num">{{ goodsStore.goodsDetail.price }}</span>
        <span class="price-decimal">.00</span>
      </div>
      <h2 class="goods-title">{{ goodsStore.goodsDetail.title }}</h2>
      <div class="meta-row">
        <span class="meta-time">上架时间：{{ goodsStore.goodsDetail.updateTime }}</span>
        <span class="meta-want">{{ goodsStore.goodsDetail.wantCount }}+人想要</span>
      </div>
    </div>

    <!-- 商品ID -->
    <div v-if="goodsStore.goodsDetail" class="id-section">
      <div class="id-row">
        <span class="id-label">商品ID</span>
        <span class="id-value">{{ goodsStore.goodsDetail.id }}</span>
        <button class="id-copy-btn" @click="handleCopy(goodsStore.goodsDetail.id)">
          一键复制
        </button>
      </div>
      <p class="id-tip">点击复制，粘贴发送给最下方客服</p>
    </div>

    <!-- 商品参数 -->
    <div v-if="goodsStore.goodsDetail" class="params-section">
      <div class="params-grid">
        <div
          v-for="(param, idx) in showAllParams
            ? goodsStore.goodsDetail.params
            : goodsStore.goodsDetail.params.slice(0, 6)"
          :key="idx"
          class="param-item"
        >
          <span class="param-label">{{ param.label }}</span>
          <span class="param-value">{{ param.value }}</span>
        </div>
      </div>
      <div
        v-if="goodsStore.goodsDetail.params.length > 6"
        class="params-toggle"
        @click="showAllParams = !showAllParams"
      >
        {{ showAllParams ? '收起参数' : '全部参数' }}
        <span class="toggle-arrow">{{ showAllParams ? '▲' : '▼' }}</span>
      </div>
    </div>

    <!-- 截图详情 -->
    <div v-if="goodsStore.goodsDetail" class="detail-images">
      <img
        v-for="(img, idx) in goodsStore.goodsDetail.images"
        :key="idx"
        class="detail-img"
        :src="img"
        alt="游戏截图"
      />
    </div>

    <!-- 底部客服栏 -->
    <div class="bottom-bar">
      <div class="customer-service">
        <span class="cs-icon">淘</span>
        <span class="cs-text">卿豪网络（请勿咨询他人以免被骗）</span>
      </div>
    </div>

    <!-- 加载中 -->
    <div v-if="goodsStore.loading" class="loading-wrap">
      <div class="loading-text">加载中...</div>
    </div>
  </div>
</template>

<style scoped>
.goods-detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 10;
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

.screenshot-section {
  background-color: #fff;
  padding: 12px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.screenshot-scroll {
  display: flex;
  gap: 8px;
  padding: 0 12px;
}

.screenshot-img {
  width: 280px;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.price-section {
  background-color: #fff;
  padding: 16px;
  margin-top: 10px;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.price-symbol {
  font-size: 14px;
  color: #ff4d4f;
  font-weight: bold;
}

.price-num {
  font-size: 28px;
  color: #ff4d4f;
  font-weight: bold;
}

.price-decimal {
  font-size: 16px;
  color: #ff4d4f;
}

.goods-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 10px 0;
  line-height: 1.5;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #999;
}

.id-section {
  background-color: #fff;
  padding: 16px;
  margin-top: 10px;
}

.id-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.id-label {
  font-size: 14px;
  color: #666;
}

.id-value {
  flex: 1;
  font-size: 14px;
  color: #333;
  font-family: monospace;
}

.id-copy-btn {
  background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
}

.id-tip {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

.params-section {
  background-color: #fff;
  padding: 16px;
  margin-top: 10px;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 8px;
}

.param-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.param-label {
  font-size: 12px;
  color: #999;
}

.param-value {
  font-size: 14px;
  color: #333;
}

.params-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.toggle-arrow {
  font-size: 10px;
}

.detail-images {
  margin-top: 10px;
  padding: 12px;
  background-color: #fff;
}

.detail-img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
  display: block;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background-color: #fff;
  border-top: 1px solid #eee;
  padding: 10px 16px;
  z-index: 100;
}

.customer-service {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cs-icon {
  width: 24px;
  height: 24px;
  background-color: #ff6a00;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.cs-text {
  font-size: 13px;
  color: #666;
}

.loading-wrap {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
}

.loading-text {
  color: #999;
  font-size: 14px;
}
</style>
