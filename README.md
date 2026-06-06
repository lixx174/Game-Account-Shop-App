# 鑫轩游戏 - 游戏账号交易平台（H5）

## 项目概述

一个面向移动端的游戏账号交易 H5 网站，支持用户浏览游戏、查看商品、搜索等功能。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.x | 前端框架 |
| Vite | 6.x | 构建工具 |
| TypeScript | 5.6.x | 类型系统 |
| Vant | 4.9.x | 移动端 UI 组件库 |
| Vue Router | 4.x | 路由管理 |
| Pinia | 2.x | 状态管理 |
| Axios | 1.x | HTTP 请求库 |
| postcss-px-to-viewport | 1.x | vw 移动端适配 |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产环境
pnpm build

# 预览生产构建
pnpm preview
```

开发服务器默认运行在 `http://localhost:3000`

## 项目目录结构

```
game-account-shop-admin/
├── docs/                       # 项目文档
│   ├── development.md          # 开发规范
│   ├── api.md                  # 接口文档
│   ├── pages.md                # 页面功能说明
│   └── future.md               # 后续扩展清单
├── public/                     # 静态资源
├── src/
│   ├── api/                    # 接口层
│   │   ├── game.ts             # 游戏相关接口
│   │   ├── goods.ts            # 商品相关接口
│   │   ├── mock.ts             # Mock 拦截器（开发阶段）
│   │   └── mockData.ts         # Mock 数据源
│   ├── assets/                 # 静态资源（图片、字体等）
│   ├── components/             # 公共组件
│   ├── router/                 # 路由配置
│   │   └── index.ts
│   ├── stores/                 # Pinia 状态管理
│   │   ├── game.ts             # 游戏状态
│   │   └── goods.ts            # 商品状态
│   ├── utils/                  # 工具函数
│   │   └── request.ts          # Axios 封装
│   ├── views/                  # 页面视图
│   │   ├── home/               # 首页
│   │   │   └── index.vue
│   │   ├── games/              # 全部游戏页
│   │   │   └── index.vue
│   │   └── goods/              # 商品相关
│   │       ├── list.vue        # 商品列表
│   │       └── detail.vue      # 商品详情
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── style.css               # 全局样式
├── index.html
├── package.json
├── postcss.config.js           # vw 适配配置
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 适配方案

采用 **vw 视口适配**，基准宽度为 **375px**（与 Vant 4 设计基准一致）。

配置见 `postcss.config.js`：
- `viewportWidth: 375`
- `viewportUnit: 'vw'`
- `exclude: [/node_modules/]`

CSS 中按设计稿尺寸直接写 px，构建时自动转换为 vw。

## 核心约定

1. **样式单位**：设计稿为 375px 基准，代码中直接写 `px`，由 postcss 自动转 vw
2. **页面最大宽度**：`max-width: 430px`，居中显示，模拟手机视口
3. **路由传参**：游戏 ID / 商品 ID 通过 URL 参数传递
4. **Mock 数据**：开发阶段使用 mock 数据，后续切换真实接口只需修改 `request.ts` 的 `baseURL`
