// Import Styles
import '@core-scss/template/index.scss'
import '@styles/styles.scss'

// Import Library
import { registerPlugins } from '@core/utils/plugins'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createApp, h } from 'vue'

// --- PENTING: Import App.vue ---
import MainLayout from '@/App.vue'
// -------------------------------

createInertiaApp({
  resolve: (name) => {
    const page = resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob('./pages/**/*.vue')
    )
    
    page.then((module) => {
      // Jika halaman tidak punya layout khusus, gunakan MainLayout (App.vue)
      module.default.layout = module.default.layout || MainLayout
    })
    
    return page
  },
  setup({ el, App, props, plugin }) {
    // Di sini 'App' adalah komponen halaman Inertia, BUKAN App.vue Anda.
    // App.vue Anda sekarang sudah menjadi layout yang membungkus 'App' ini.
    
    const app = createApp({ render: () => h(App, props) })
    
    app.use(plugin)
    registerPlugins(app)
    
    app.mount(el)
  },
})
