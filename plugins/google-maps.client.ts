import { defineNuxtPlugin } from '#app'
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: 'YOUR_GOOGLE_MAPS_API_KEY',
      libraries: 'places',
    },
  })
})
