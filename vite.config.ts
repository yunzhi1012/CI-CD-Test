import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/CI-CD-Test/',  // 改成你的仓库名，注意前后都有斜杠
  // 如果是部署在根域名（如 username.github.io）则用 base: '/'
})