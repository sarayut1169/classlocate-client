<template>
  <div class="login-container">
    <div class="login-card">
      <h2>🔐 เข้าสู่ระบบ Class Locate</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">📧 Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">🔒 Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">เข้าสู่ระบบ</button>
      </form>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
const { $auth } = useNuxtApp()
// import { useCookie } from 'nuxt/app'
// const token = useCookie('access_token')
// token.value = result.resultData.accessToken
const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')
const login = async () => {
  
    const response = await fetch('/api/loginApi', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const result = await response.json()

  if (result?.resultData?.accessToken) {
    if(result.resultData.role == 2){
    //$auth.setToken(result.resultData.accessToken)
    await navigateTo('/class/class')
    // localStorage.setItem('accessToken', result.resultData.accessToken)
    localStorage.setItem('userId',result.resultData.id)
    localStorage.setItem('teacherId',result.resultData.teacherId)
    localStorage.setItem('accessToken',result.resultData.accessToken)
    }
    if(result.resultData.role == 3){
    $auth.setToken(result.resultData.accessToken)
    await navigateTo('/')
    }

  } else {
    errorMessage.value = result.message || 'เข้าสู่ระบบไม่สำเร็จ'
    await navigateTo('/login')
  }


    
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #f76b1c); /* น้ำเงิน → ส้ม */
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: #fff;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 24px;
  color: #ffffff;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #ffffff;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 16px;
}

.input-group input::placeholder {
  color: #ddd;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #f76b1c; /* ส้ม */
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #ff8c42;
}
</style>