<!-- // app/pages/subject/subject.vue -->
<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-100 via-white to-orange-100">
    <!-- Sidebar -->
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />

    <!-- Main Content -->
    <div class="flex-grow p-4">
      <div class="d-flex justify-end mb-3">

    </div>
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-primary p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">รายวิชาที่รับผิดชอบ</h4>

          <div class="table-responsive">
            <table class="table table-bordered table-hover align-middle">
              <thead class="table-warning text-center">
                <tr>
                  <th scope="col">ชื่อวิชา</th>
                  <th scope="col">รหัสวิชา</th>
                  <th scope="col">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in data?.resultData"
                  :key="index"
                  class="table-info"
                >
                  <!-- ซ่อน ID ไว้ใน td ตาม spec -->
                  <td class="d-none">{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.subjectCode }}</td>
                  <td class="text-center">
                    <button
                      class="btn btn-sm btn-warning rounded-pill shadow-sm px-3"
                      @click="viewSubject({ subjectId: item.id })"
                    >
                      เข้าห้องเรียน
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700&display=swap');

.font-prompt {
  font-family: 'Prompt', sans-serif;
}
</style>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
definePageMeta({
  middleware: ['auth']
})
const data = ref(null)

async function fetchTeacherData() {
  const teacherId = localStorage.getItem('teacherId')
  const accessToken = localStorage.getItem('accessToken')

  if (!teacherId) return

  try {
    const response = await fetch('/api/subject/subjectByTeacherIdApi/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teacherId, accessToken }),
    })

    if (!response.ok) {
      const error = new Error(`API error: ${response.status}`)
      console.error('Failed to fetch teacher data:', error)
      throw error
    }

    data.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch teacher data:', error)
  }
}

function viewSubject({ subjectId }) {
  // เก็บค่าลง sessionStorage
  sessionStorage.setItem('subjectId', subjectId)

  // ไปหน้า setsubject โดยไม่ส่ง query
  navigateTo('/class/classinfo')
}
function createSubject() {
  // ไปหน้า setsubject โดยไม่ส่ง subjectId
  sessionStorage.removeItem('subjectId') // ล้างค่าเก่า ถ้ามี
  navigateTo('/subject/createsubject')
}

onMounted(() => {
  fetchTeacherData()
})

</script>

