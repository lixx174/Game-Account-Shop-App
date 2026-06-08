<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const visible = ref(false)
const images = ref<string[]>([])
const currentIndex = ref(0)

// 触摸相关
const touchStartX = ref(0)
const touchEndX = ref(0)

const currentImage = computed(() => images.value[currentIndex.value] || '')
const pageText = computed(() => `${currentIndex.value + 1} / ${images.value.length}`)

function open(e: Event) {
  const customEvent = e as CustomEvent<{ images: string[]; startIndex: number }>
  images.value = customEvent.detail.images || []
  currentIndex.value = customEvent.detail.startIndex || 0
  visible.value = true
  document.body.style.overflow = 'hidden'
}

function close() {
  visible.value = false
  document.body.style.overflow = ''
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function next() {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++
  }
}

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX
}

function onTouchEnd(e: TouchEvent) {
  touchEndX.value = e.changedTouches[0].clientX
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      next()
    } else {
      prev()
    }
  }
}

onMounted(() => {
  globalThis.addEventListener('image-preview', open)
})

onUnmounted(() => {
  globalThis.removeEventListener('image-preview', open)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="image-preview"
      @click="close"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <!-- 关闭按钮 -->
      <div class="preview-close" @click.stop="close">✕</div>

      <!-- 页码 -->
      <div class="preview-page">{{ pageText }}</div>

      <!-- 左箭头 -->
      <div
        v-if="currentIndex > 0"
        class="preview-arrow preview-prev"
        @click.stop="prev"
      >
        ‹
      </div>

      <!-- 图片 -->
      <img
        class="preview-img"
        :src="currentImage"
        alt="预览"
        @click.stop
        @touchstart.stop
        @touchend.stop
      />

      <!-- 右箭头 -->
      <div
        v-if="currentIndex < images.length - 1"
        class="preview-arrow preview-next"
        @click.stop="next"
      >
        ›
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.image-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}

.preview-close {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 24px;
  color: #fff;
  z-index: 1001;
  cursor: pointer;
  padding: 8px;
}

.preview-page {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #fff;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 4px 12px;
  border-radius: 12px;
}

.preview-img {
  max-width: 100vw;
  max-height: 80vh;
  object-fit: contain;
}

.preview-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  z-index: 1001;
  cursor: pointer;
  padding: 16px;
  user-select: none;
}

.preview-prev {
  left: 4px;
}

.preview-next {
  right: 4px;
}
</style>
