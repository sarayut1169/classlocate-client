<!-- // app/pages/Teacher/teahcerHomepage.vue -->
<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />
    
    <div class="flex-grow p-4">
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">สถานะการเข้าเรียน</h4>

          <div class="table-responsive">

            <table class="table table-bordered table-striped table-hover align-middle">
              <thead class="table-info text-center">
                <tr>
                  <th scope="col">ชื่อนักศึกษา</th>
                  <th scope="col">รหัสนักศึกษา</th>
                  <th scope="col">สาขา</th>
                  <th scope="col">สถานะการเข้าเรียน</th>
                  <th scope="col">เวลาเข้าเรียน</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in classData"
                  :key="index"
                  class="text-center"
                >
                  <td>{{ item.studentName }}</td>
                  <td>{{ item.studentId }}</td>
                  <td>{{ item.major }}</td>
                  <td>{{ item.checkinStatus }}</td>
                  <td>{{ item.checkInTime === null ? 'ยังไม่ได้เข้าเรียน' : item.checkInTime }}</td>

                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const subjectId = ref(null)
const accessToken = ref(null)
const classData = ref(null)
onMounted(async () => {
  subjectId.value = sessionStorage.getItem('subjectId')
  accessToken.value = localStorage.getItem('accessToken')

  if (!subjectId.value || !accessToken.value) return

  await loadSubjectInfo()
})

async function loadSubjectInfo() {
  try {
    const response = await fetch('/api/class/classCheckinData/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subjectId: subjectId.value, accessToken: accessToken.value }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const data = await response.json()
    classData.value = data.resultData
  } catch (error) {
    console.error('โหลดข้อมูลไม่สำเร็จ:', error)
    classData.value = null
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>