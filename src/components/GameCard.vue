<script setup lang="ts">
import type { GameItem } from '@/api/mockData'

interface Props {
  game: GameItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [game: GameItem]
}>()

function handleClick() {
  emit('click', props.game)
}
</script>

<template>
  <div class="game-card" @click="handleClick">
    <img class="game-card__icon" :src="game.icon" :alt="game.name" />
    <span class="game-card__name">{{ game.name }}</span>
  </div>
</template>

<style scoped>
.game-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
}

.game-card__icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
}

.game-card__name {
  font-size: 12px;
  color: #333;
  text-align: center;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
