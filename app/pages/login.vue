<template>
  <div class="login-container">
    <div class="login-card">
      <h2>🔐 เข้าสู่ระบบ Class Locate</h2>

      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">📧 Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="กรอกอีเมลของคุณ"
          />
        </div>

        <div class="input-group">
          <label for="password">🔒 รหัสผ่าน</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="กรอกรหัสผ่านของคุณ"
          />
        </div>

        <button type="submit" class="login-button">เข้าสู่ระบบ</button>
      </form>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <div class="register-buttons">
        <router-link to="/registerstudent" class="btn-outline">
          สมัครสมาชิก (นักศึกษา)
        </router-link>
        <router-link to="/registerteacher" class="btn-outline">
          สมัครสมาชิก (อาจารย์)
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await fetch('/api/loginApi', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const result = await response.json()

    if (result?.resultData?.accessToken) {
      const data = result.resultData
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('userId', data.id)

      if (data.role === 2) {
        localStorage.setItem('teacherId', data.teacherId)
        await router.push('/class/class')
      } else if (data.role === 3) {
        localStorage.setItem('studentId', data.studentId)
        await router.push('/student/studenthomepage')
      }
    } else {
      errorMessage.value = result.message || 'เข้าสู่ระบบไม่สำเร็จ'
    }
  } catch (error) {
    errorMessage.value = 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #1e3c72, #f76b1c);
  font-family: 'Prompt', sans-serif;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
  color: #fff;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 24px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 16px;
  outline: none;
}

.input-group input::placeholder {
  color: #ddd;
}

.login-button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #f76b1c;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background-color: #ff8c42;
}

.error-text {
  color: #ffb3b3;
  margin-top: 15px;
  font-weight: 500;
}

.register-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
}

.btn-outline {
  display: block;
  width: 100%;
  padding: 12px;
  text-align: center;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #ffcc99;
  color: #ffcc99;
}
</style>
