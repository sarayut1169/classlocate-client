<!-- // app/pages/Teacher/teahcerHomepage.vue -->
<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />
    
    <div class="flex-grow p-4">
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">สถานะการเข้าเรียน</h4>
          <div v-if="errorMessage" class="alert alert-danger text-center fw-bold mb-4">
            {{ errorMessage }}
          </div>
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
import { useRouter } from 'vue-router'

const router = useRouter()
const subjectInfoId = ref(null)
const accessToken = ref(null)
const classData = ref(null)
const errorMessage = ref(null) // ✅ เพิ่มตัวแปรสำหรับ error message

onMounted(async () => {
  subjectInfoId.value = sessionStorage.getItem('subjectInfoId')
  accessToken.value = localStorage.getItem('accessToken')

  console.log("subjectInfoId:", subjectInfoId.value);
  

  if (!subjectInfoId.value || !accessToken.value) {
    errorMessage.value = 'ไม่พบข้อมูลวิชา หรือ access token'
    return
  }

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
      body: JSON.stringify({
        subjectInfoId: subjectInfoId.value,
        accessToken: accessToken.value,
      }),
    })
    if (response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const data = await response.json()
    if (data.isSuccess === false) {
      throw new Error(data.errorMessages || 'เกิดข้อผิดพลาดจาก API')
    }

    classData.value = data.resultData
    errorMessage.value = null // ✅ ล้าง error ถ้าโหลดสำเร็จ
  } catch (error) {
    console.error('โหลดข้อมูลไม่สำเร็จ:', error)
    classData.value = null
    errorMessage.value = error.message || 'ไม่สามารถโหลดข้อมูลได้'
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>