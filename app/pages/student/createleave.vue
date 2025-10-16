<!-- // app/pages/Teacher/teahcerHomepage.vue -->
<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />
    
    <div class="flex-grow p-4">
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">แบบฟอร์มการลา</h4>
          <form @submit.prevent="saveLeave">
            <div class="mb-3">
              <label for="leave-day" class="form-label">วันที่ลา</label>
              <input v-model="leaveData.leaveDay" type="date" class="form-control" id="leave-day" placeholder="วันที่ลา" required style="width: 150px;">
            </div>
            <div class="mb-3">
              <label for="leave-description" class="form-label">หมายเหตุ</label>
              <textarea v-model="leaveData.description" class="form-control" id="leave-description" placeholder="หมายเหตุ" style="width: 100%; height: 300px;" required></textarea>
            </div>
            <div class="d-flex justify-content-end">
            <NuxtLink to="/student/studentsubjectInfo" class="btn btn-secondary me-2">ยกเลิก</NuxtLink>
            <button type="submit" class="btn btn-primary">บันทึก</button>
            </div>
          </form>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'

const leaveData = ref({
  leaveDay: '',
  description: '',
})

const router = useRouter()

async function saveLeave() {
  const accessToken = localStorage.getItem('accessToken')
  const studentId = localStorage.getItem('studentId')
  const subjectInfoId = sessionStorage.getItem('subjectInfoId')



  if (!studentId || !accessToken) {
    alert('ไม่พบข้อมูลผู้ใช้')
    return
  }

  try {
    const response = await fetch('/api/class/createleave/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId,
        accessToken,
        subjectInfoId,
        description:"วันที่ลา:"+leaveData.value.leaveDay+"  หมายเหตุ:"+leaveData.value.description
      }),
    })

    const result = await response.json()
    if (result.errorMessages) {
      alert(result.errorMessages)
      return router.push('/student/studentsubjectInfo')
    }
    router.push('/student/studentsubjectInfo')
  } catch (error) {
    console.error('Error creating subject:', error)
    alert('เกิดข้อผิดพลาด')
    router.push('/student/studentsubjectInfo')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>