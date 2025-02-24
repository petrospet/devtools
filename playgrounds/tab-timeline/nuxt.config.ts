// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '../../packages/devtools-ui-kit/src/module',
    '../../local',
  ],
  ssr: false,
  vite: {
    clearScreen: false,
  },
  devtools: {
    enabled: false,
    experimental: {
      timeline: true,
    },
    timeline: {
      functions: {
        includeFrom: [
          '#app',
          '@unhead/vue',
          '@vueuse/core',
        ],
      },
    },
  },
})
