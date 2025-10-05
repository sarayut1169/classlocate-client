<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-100 via-white to-orange-100">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />
    <div class="flex-grow p-4">
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">วันที่เรียน</h4>

          <div class="table-responsive">

            <table class="table table-bordered table-striped table-hover align-middle">
              <thead class="table-info text-center">
                <tr>
                  <th scope="col">วัน</th>
                  <th scope="col">เวลาเริ่มเรียน</th>
                  <th scope="col">เวลาสิ้นสุดเรียน</th>
                  <th scope="col">เวลาเริ่มเช็คชื่อ</th>
                  <th scope="col">เวลาสิ้นสุดเช็คชื่อ</th>
                  <th scope="col">แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in subjectInfo"
                  :key="index"
                  class="text-center"
                >
                  <td>{{ item.day }}</td>
                  <td>{{ item.leranStartTime }}</td>
                  <td>{{ item.leranEndTime }}</td>
                  <td>{{ item.startCheckIn }}</td>
                  <td>{{ item.endCheckIn }}</td>
                  <td>
                    <NuxtLink to="/class/classdata" class="btn btn-warning">การเข้าเรียน</NuxtLink>
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
import { ref, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const subjectId = ref(null)
const accessToken = ref(null)
const subjectInfo = ref(null)
const isEditingSubjectInfo = ref(false)

onMounted(async () => {
  subjectId.value = sessionStorage.getItem('subjectId')
  accessToken.value = localStorage.getItem('accessToken')

  if (!subjectId.value || !accessToken.value) return

  await loadSubjectInfo()
})

async function loadSubjectInfo() {
  try {
    const response = await fetch('/api/subject/subjectInfoBySubjectId/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subjectId: subjectId.value, accessToken: accessToken.value }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const data = await response.json()
    subjectInfo.value = data.resultData
  } catch (error) {
    console.error('โหลดข้อมูลเวลาเรียนไม่สำเร็จ:', error)
    subjectInfo.value = null
  }
}


// function goToSeeData() {
//   router.push('/class/classdata')
// }

</script>

