import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import eslintPlugin from 'vite-plugin-eslint'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cypress': path.resolve(__dirname, './cypress'),
    },
  },
  define: {
    'process.env': process.env,
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: ` @import "@/assets/sass/global/variables.scss"; `,
      },
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: 'src/assets/sass/global/index.sass',
    }),
    checker({ typescript: true, vueTsc: true }),
    eslintPlugin({ cache: false }),
  ],
})
