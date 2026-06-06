# 开发规范

## 目录规范

```
src/
├── api/              # 接口层：所有 HTTP 请求
│   ├── game.ts       # 游戏模块接口
│   ├── goods.ts      # 商品模块接口
│   └── ...           # 新增模块按业务拆分
├── components/       # 公共组件（多处复用）
│   ├── GameCard.vue
│   ├── GoodsCard.vue
│   └── SearchBar.vue
├── views/            # 页面组件（与路由一一对应）
│   ├── home/
│   ├── games/
│   └── goods/
├── stores/           # Pinia Store（按业务模块拆分）
│   ├── game.ts
│   └── goods.ts
├── router/           # 路由配置
├── utils/            # 工具函数
└── assets/           # 静态资源
```

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 文件（组件） | PascalCase | `GameCard.vue` |
| 文件（TS/JS） | camelCase | `request.ts` |
| 文件（页面） | index.vue 或语义化 | `home/index.vue` |
| 组件名 | PascalCase | `<GameCard />` |
| 变量/函数 | camelCase | `getHotGames` |
| 常量 | UPPER_SNAKE_CASE | `API_BASE_URL` |
| 类型/接口 | PascalCase | `interface GameItem` |
| Pinia Store | useXxxStore | `useGameStore` |

## Vue 单文件组件规范

```vue
<script setup lang="ts">
// 1. import 顺序：Vue 核心 → 第三方库 → 内部模块 → 类型
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import type { GameItem } from '@/api/mockData'

// 2. 类型定义
interface Props {
  gameId: string
}

// 3. 常量
const ROUTE_PATH = '/games'

// 4. 响应式数据
const loading = ref(false)
const list = ref<GameItem[]>([])

// 5. computed
const total = computed(() => list.value.length)

// 6. 方法
function handleClick(item: GameItem) {
  // ...
}

// 7. 生命周期
onMounted(() => {
  // ...
})
</script>

<template>
  <!-- 语义化 class 命名 -->
  <div class="game-card">
    <!-- ... -->
  </div>
</template>

<style scoped>
/* BEM 命名规范 */
.game-card {
  /* ... */
}
.game-card__icon {
  /* ... */
}
.game-card__title {
  /* ... */
}
.game-card--active {
  /* ... */
}
</style>
```

## 接口调用规范

1. **统一走封装后的 request**，不直接调用 axios
2. **接口文件按业务模块拆分**，如 `game.ts`、`goods.ts`、`user.ts`
3. **接口返回统一结构**：
   ```ts
   {
     code: number    // 200 为成功
     data: any       // 业务数据
     message: string // 提示信息
   }
   ```
4. **Mock 阶段使用 catch 兜底**，后续真实接口只需去掉 catch

## 状态管理规范

1. **Store 按业务模块拆分**，如 `game.ts`、`goods.ts`、`user.ts`
2. **使用 Composition API 写法**：
   ```ts
   export const useXxxStore = defineStore('xxx', () => {
     // state
     const data = ref([])
     // getters
     const computedData = computed(() => ...)
     // actions
     async function fetchData() { ... }
     return { data, computedData, fetchData }
   })
   ```
3. **Store 中不做 UI 操作**（不弹 Toast、不跳路由），这些交给页面组件

## 路由规范

1. **路由懒加载**：所有页面使用 `() => import('@/views/xxx')`
2. **路由名使用 PascalCase**
3. **路由参数**：
   - 游戏 ID：`/goods-list/:gameId`
   - 商品 ID：`/goods-detail/:goodsId`

## Git 提交规范

```
[类型][模块]：描述

类型：feat / fix / docs / style / refactor / perf / test / chore
模块：home / games / goods / user / common / config
```

示例：
- `feat[home]：首页热门游戏网格展示`
- `fix[goods]：商品列表筛选失效问题`
- `docs[api]：更新接口文档`
