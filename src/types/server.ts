/**
 * 服务端原始响应类型定义
 * 与后端 Java DTO 对齐
 */

/** 统一响应结构 */
export interface ServerResult<T> {
  code: number
  msg: string
  data: T
}

/** 分页响应结构 */
export interface ServerPageReply<T> {
  current: number
  size: number
  pages: number
  records: T[]
}

// ========== Game ==========

/** 服务端：游戏分页DTO */
export interface ServerGamePageDto {
  id: number
  name: string
  icon: string
}

/** 服务端：游戏分页查询 */
export interface ServerGamePageQuery {
  current?: number
  size?: number
  name?: string
}

// ========== GameAccount ==========

/** 服务端：账号分页DTO */
export interface ServerGameAccountPageDto {
  id: number
  title: string
  originName: string
  serverName: string
  systemName: string
  tags: string[]
  price: number
  img: string
}

/** 服务端：账号分页查询 */
export interface ServerGameAccountPageQuery {
  current?: number
  size?: number
  gameId: number
  originId?: number
  systemId?: number
  title?: string
}

/** 服务端：账号详情DTO */
export interface ServerGameAccountDetailDto {
  id: number
  title: string
  originName: string
  serverName: string
  systemName: string
  price: number
  process: string
  policy: string
  images: string[]
  remark: string
  createAt: string
}

// ========== GameDictionary ==========

/** 服务端：字典下拉DTO */
export interface ServerGameDictionaryPickerDto {
  id: number
  name: string
}

/** 服务端：字典下拉查询 */
export interface ServerGameDictionaryPickerQuery {
  current?: number
  size?: number
  gameId: string
  gameDictionary: string
}
