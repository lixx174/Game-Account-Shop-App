import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const base = env.VITE_BASE || "/";

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    server: {
      port: 3000,
      host: true,
proxy: {
  '/api': {
    target: 'https://qinghaotech.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/api'),
    configure: (proxy, options) => {
      proxy.on('proxyReq', (proxyReq, req) => {
        console.log('代理请求:', req.url, '→', proxyReq.path)
      })
    }
  }
}
    },
  };
});
