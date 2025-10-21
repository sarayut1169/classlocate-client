// plugins/fetch-interceptor.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:fetch', (ctx) => {
    ctx.options.onResponseError = ({ response }) => {
      if (response.status === 401) {
        localStorage.removeItem("accessToken")
        nuxtApp.$router.push('/login')
      }
    }
  })
})