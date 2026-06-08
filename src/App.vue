<script setup lang="ts">
import { RouterView } from 'vue-router'
import ImagePreview from '@/components/ImagePreview.vue'
</script>

<template>
  <div class="app-container">
    <RouterView />
    <ImagePreview />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
