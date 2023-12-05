import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      serviceWorker: {
        src: '/sw.js', // Specify the path to your custom sw.js file
      },
    }),
    // VitePWA({
    //   name: 'PW App',
    //   short_name: 'MyApp',
    //   description: 'My Awesome App description',
    //   theme_color: '#ffffff',
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/icons/512.png",
    //         sizes: '512x512',
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //       {
    //         src: "/icons/192.png",
    //         sizes: '192x192',
    //         type: "image/png",
    //         purpose: "any maskable"
    //       }
    //     ]
    //   },
    //   workbox: {
    //     runtimeCaching: [{
    //       urlPattern: /.*/,
    //       handler: 'NetworkOnly',
    //         options: {
    //           backgroundSync: {
    //             name: 'sync-queue',
    //             options: {
    //               maxRetentionTime: 60 * 60, // Max retention time in seconds
    //             },
    //           },
    //         },
    //     }],
    //     clientsClaim: true,
    //     skipWaiting: true
    //   },
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true
    //   }
    // })
  ],
})
