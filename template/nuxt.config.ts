import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'pathe'

const resolveFromTemplate = (...paths: string[]) => resolve(dirname(fileURLToPath(import.meta.url)), ...paths)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: false },

  modules: [
    '@nuxt/fonts',
    '@nuxt/ui-pro',
    '@vueuse/sound/nuxt',
  ],

  css: [resolveFromTemplate('./assets/main.css')],

  components: [
    {
      extensions: ['.vue'],
      global: true,
      path: resolveFromTemplate('./components'),
      pathPrefix: false,
    },
    {
      extensions: ['.vue'],
      global: true,
      path: resolveFromTemplate('./components/app'),
      pathPrefix: false,
    },
    {
      extensions: ['.vue'],
      global: true,
      path: resolveFromTemplate('./components/ui'),
      pathPrefix: false,
    },
  ],

  imports: { dirs: [resolveFromTemplate('./composables')] },

  icon: { serverBundle: 'remote' },
})
