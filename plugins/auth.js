export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: {
        setToken(token) {
          localStorage.setItem('accessToken', token)
        },
        getToken() {
          return localStorage.getItem('accessToken')
        },
        clearToken() {
          localStorage.removeItem('accessToken')
        }
      }
    }
  }
})