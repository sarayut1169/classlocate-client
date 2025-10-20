// plugins/fetch-interceptor.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:fetch', (ctx) => {
    ctx.options.onResponseError = ({ response }) => {
      if (response.status === 401 ||
         
      ) {
        // ลบ token
        const token = localStorage.getItem("accessToken");
        token.value = null

        const router = useRouter()
        router.push('/login')
      }
    }
  })
})
