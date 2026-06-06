# 接口文档

> 当前阶段使用 Mock 数据开发，后续接入真实接口时：
> 1. 修改 `src/utils/request.ts` 中的 `baseURL` 为真实后端地址
> 2. 去掉 `src/api/mock.ts` 中的 `.catch()` 兜底
> 3. 或者直接调用 `src/api/game.ts` 和 `src/api/goods.ts` 中的方法

---

## 响应格式

所有接口统一返回：

```json
{
  "code": 200,       // 状态码，200 为成功
  "data": {},        // 业务数据
  "message": "success"
}
```

---

## 游戏模块

### 1. 获取首页热门游戏

```
GET /api/games/hot
```

**请求参数**：无

**响应**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "2",
      "name": "奥特曼系列OL",
      "icon": "https://...",
      "letter": "A",
      "pinyin": "aotemanxilie"
    }
  ],
  "message": "success"
}
```

---

### 2. 获取全部游戏

```
GET /api/games/all
```

**请求参数**：无

**响应**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "1",
      "name": "暗区突围",
      "icon": "https://...",
      "letter": "A",
      "pinyin": "anqutuwu"
    }
  ],
  "message": "success"
}
```

---

### 3. 搜索游戏

```
GET /api/games/search
```

**请求参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | string | 是 | 搜索关键词（支持名称和拼音） |

**响应**：同上

---

## 商品模块

### 4. 获取商品列表

```
GET /api/goods/list/:gameId
```

**路径参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| gameId | string | 游戏 ID |

**查询参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| platform | string | 否 | 平台筛选（安卓/iOS/PC） |
| sort | string | 否 | 排序方式（price_asc/price_desc/time） |

**响应**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "g001",
      "gameId": "2",
      "title": "准毕业6by有终身三星闪迪卡",
      "price": 1595,
      "images": ["https://..."],
      "tags": ["找回包赔", "官方验号", "安全保障"],
      "platform": "安卓果盘帐号",
      "server": "2210服",
      "level": "234",
      "updateTime": "4小时前",
      "wantCount": 99
    }
  ],
  "message": "success"
}
```

---

### 5. 获取商品详情

```
GET /api/goods/detail/:goodsId
```

**路径参数**：

| 参数 | 类型 | 说明 |
|------|------|------|
| goodsId | string | 商品 ID |

**响应**：

```json
{
  "code": 200,
  "data": {
    "id": "g001",
    "gameId": "2",
    "gameName": "奥特曼系列OL",
    "title": "准毕业6by有终身三星闪迪卡",
    "price": 1595,
    "images": ["https://...", "https://..."],
    "tags": ["找回包赔", "官方验号", "安全保障"],
    "params": [
      { "label": "游戏名称", "value": "奥特曼系列OL" },
      { "label": "商品类型", "value": "成品号" },
      { "label": "客户端", "value": "果盘" },
      { "label": "系统", "value": "安卓版" },
      { "label": "服务器", "value": "2210服" },
      { "label": "角色等级", "value": "234" }
    ],
    "updateTime": "4小时前更新",
    "wantCount": 99
  },
  "message": "success"
}
```

---

## 数据类型定义

```ts
// 游戏
interface GameItem {
  id: string
  name: string
  icon: string
  letter: string
  pinyin?: string
}

// 商品（列表）
interface GoodsItem {
  id: string
  gameId: string
  title: string
  price: number
  images: string[]
  tags: string[]
  platform: string
  server: string
  level?: string
  updateTime: string
  wantCount: number
}

// 商品（详情）
interface GoodsDetail {
  id: string
  gameId: string
  gameName: string
  title: string
  price: number
  images: string[]
  tags: string[]
  params: Array<{ label: string; value: string }>
  updateTime: string
  wantCount: number
}
```

---

## 后续需补充的接口

| 接口 | 说明 | 优先级 |
|------|------|--------|
| POST /api/auth/login | 用户登录 | 高 |
| POST /api/auth/register | 用户注册 | 高 |
| GET /api/user/info | 获取用户信息 | 高 |
| POST /api/goods/buy | 购买商品 | 中 |
| GET /api/orders | 订单列表 | 中 |
| GET /api/orders/:id | 订单详情 | 中 |
| POST /api/goods/publish | 发布商品 | 中 |
| POST /api/upload/image | 图片上传 | 中 |
| GET /api/messages | 消息列表 | 低 |
| POST /api/contact/customer | 联系客服 | 低 |
