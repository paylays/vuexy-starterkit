// Import Styles
import '@core-scss/template/index.scss'
import '@styles/styles.scss'

// Import Library
import { registerPlugins } from '@core/utils/plugins'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, h } from 'vue'

import AppWrapper from '@/App.vue'; // Wrapper utama untuk semua halaman
import DefaultLayout from '@/layouts/default.vue'; // Layout dengan Sidebar

// --- PENTING: Import App.vue ---
// -------------------------------

createInertiaApp({
  resolve: (name) => {
    const page = resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob('./pages/**/*.vue')
    )
    
    page.then((module) => {
      // Logika Layout:
      // 1. Jika halaman punya layout sendiri, pakai itu.
      // 2. Jika tidak, dan bukan halaman login, pakai DefaultLayout (Sidebar).
      // 3. Semua layout ini nanti akan dibungkus otomatis oleh AppWrapper via render function di bawah
      
      if (!module.default.layout) {
          if (name.includes('login') || name.includes('auth')) {
             // Login tidak butuh sidebar, biarkan null (nanti cuma dibungkus AppWrapper)
             module.default.layout = undefined 
          } else {
             module.default.layout = DefaultLayout
          }
      }
    })
    
    return page
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({ 
      render: () => h(AppWrapper, null, {
        default: () => h(App, props)
      })
    })
    
    app.use(plugin)
    registerPlugins(app)
    
    app.mount(el)
  },
})
