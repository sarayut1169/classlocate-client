<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg p-4 w-100" style="max-width: 600px;">
      <h3 class="text-center mb-4">📝 สมัครสมาชิก (นักศึกษา)</h3>

      <form @submit.prevent="register">
        <!-- Account Info -->


        <div class="mb-3">
          <label for="email" class="form-label">อีเมล</label>
          <input v-model="form.email" type="email" class="form-control" id="email" placeholder="example@email.com" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">รหัสผ่าน</label>
          <input v-model="form.password" type="password" class="form-control" id="password" placeholder="••••••••" required />
        </div>


        <div class="mb-3">
          <label for="telNo" class="form-label">เบอร์โทรศัพท์</label>
          <input v-model="form.telNo" type="tel" class="form-control" id="telNo" placeholder="08XXXXXXXX" required />
        </div>

        <!-- Student Info -->
        <div class="mb-3">
          <label for="studentName" class="form-label">ชื่อ-สกุล (นักศึกษา)</label>
          <input v-model="form.studentInfo.name" type="text" class="form-control" id="studentName" placeholder="ชื่อ-นามสกุล" required />
        </div>

        <div class="mb-3">
          <label for="studentId" class="form-label">รหัสนักศึกษา</label>
          <input v-model="form.studentInfo.studentId" type="text" class="form-control" id="studentId" placeholder="6512345678" required />
        </div>

        <div class="mb-4">
          <label for="major" class="form-label">สาขาวิชา</label>
          <input v-model="form.studentInfo.major" type="text" class="form-control" id="major" placeholder="วิทยาการคอมพิวเตอร์" required />
        </div>

        <!-- Feedback -->
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="alert alert-success" role="alert">
          {{ successMessage }}
        </div>

        <button type="submit" class="btn btn-primary w-100">สมัครสมาชิก</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  telNo: '',
  studentInfo: {
    name: '',
    studentId: '',
    major: ''
  }
})

const errorMessage = ref('')
const successMessage = ref('')


const register = async () => {
  try {
    const res = await fetch('/api/registerstudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const result = await res.json()

    if (res.ok) {
      successMessage.value = 'สมัครสมาชิกสำเร็จ! กำลังเปลี่ยนหน้า...'
      errorMessage.value = ''
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      errorMessage.value = result.message || 'สมัครสมาชิกไม่สำเร็จ'
    }
  } catch (err) {
    errorMessage.value = 'เกิดข้อผิดพลาดในการเชื่อมต่อ'
  }
}
</script>
