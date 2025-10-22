<template>
  <div class="flex min-h-screen font-prompt bg-gradient-to-br from-blue-100 via-white to-orange-100">
    <!-- Sidebar -->
    <Sidebar class="fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />

    <div class="flex-grow p-6">
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-primary p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">สร้างวิชาใหม่</h4>

          <form @submit.prevent="saveNewSubject">
            <div class="mb-3">
              <label class="form-label">ชื่อวิชา</label>
              <input v-model="newSubject.name" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">รหัสวิชา</label>
              <input v-model="newSubject.subjectCode" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">ตำแหน่ง (4 ตำแหน่ง)</label>
              <div
                v-for="(label, index) in ['ซ้ายบน', 'ขวาบน', 'ซ้ายล่าง', 'ขวาล่าง']"
                :key="index"
                class="mb-2"
              >
                <label>{{ label }}</label>
                <input v-model="newSubject.location[index]" class="form-control" required />
              </div>
            </div>

            <div class="text-end">
              <button type="button" @click="cancelEdit" class="btn btn-secondary me-2">ยกเลิก</button>
              <button type="submit" class="btn btn-success">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'

const router = useRouter()

const newSubject = ref({
  name: '',
  subjectCode: '',
  location: ['0,0', '0,0', '0,0', '0,0'], // default 4 ตำแหน่ง
})

async function saveNewSubject() {
  const teacherId = localStorage.getItem('teacherId')
  const accessToken = localStorage.getItem('accessToken')

  if (!teacherId || !accessToken) {
    alert('ไม่พบข้อมูลผู้ใช้')
    return
  }
  try {
    const response = await fetch('/api/subject/subjectCreate/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teacherId,
        accessToken,
        name: newSubject.value.name,
        subjectCode: newSubject.value.subjectCode,
        location: newSubject.value.location,
      }),
    })
    if (response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    alert('สร้างวิชาเรียบร้อยแล้ว')
    router.push('/subject/subject')
  } catch (error) {
    console.error('Error creating subject:', error)
    alert('เกิดข้อผิดพลาดในการสร้างวิชา')
  }
}

function cancelEdit() {
  router.push('/subject/subject')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700&display=swap');

.font-prompt {
  font-family: 'Prompt', sans-serif;
}
</style>