import { resolve, dirname } from 'pathe'
import { fileURLToPath } from 'url'

const resolveFromSite = (...paths: string[]) => resolve(dirname(fileURLToPath(import.meta.url)), ...paths)

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: false },
  
  extends: ['@yaelg/boing'],

  watch: [
    resolveFromSite('../template/**/*')
  ]
})
