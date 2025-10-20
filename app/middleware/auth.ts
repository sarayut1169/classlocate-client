import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"
import { useAuth } from "./useauth"

// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/login') return
    const response = await useAuth()
    console.log('Auth response:', response)

    if(response === 404){
      return navigateTo('/login')
    }
  }
)