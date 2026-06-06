export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,      // 设计稿基准宽度（Vant 默认 375）
      viewportHeight: 667,     // 设计稿基准高度
      unitPrecision: 5,        // 转换精度
      viewportUnit: 'vw',      // 转换单位
      selectorBlackList: ['.ignore', '.app-container'], // 忽略转换的类名（app-container 的 max-width 需要固定 px）
      minPixelValue: 1,        // 最小转换值
      mediaQuery: false,       // 不转换媒体查询
      exclude: [/node_modules/] // 排除 node_modules
    }
  }
}
