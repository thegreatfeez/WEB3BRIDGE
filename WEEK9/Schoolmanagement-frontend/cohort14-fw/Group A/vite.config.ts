// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     nodePolyfills(),
//   ],
//   define: {
//     'process.env': {},
//     global: 'globalThis',
//   },
//   resolve: {
//     alias: {
//       process: 'process/browser',
//       buffer: 'buffer',
//       util: 'util',
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis',
//       },
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    'process.env': {},
    'process.browser': true,
    global: 'globalThis',
  },
})