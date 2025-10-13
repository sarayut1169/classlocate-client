<!-- // app/pages/Teacher/teahcerHomepage.vue -->
<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />
    
      <div class="container mt-5">
            <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-primary p-4">
            <h4 class="mb-4 text-center text-primary fw-bold">เช็คอิน</h4>

            <div class="text-center text-lg text-gray-700">
                ⏰ เวลาปัจจุบัน: <span class="font-semibold text-primary">{{ currentTime }}</span>
            </div>

            <div v-if="data" class="text-center text-lg text-gray-700 mt-3">
            📅 รหัสนักเรียน: <span class="font-semibold text-primary">{{ data.studentId }}</span><br>
            🧑‍🎓 ชื่อ: <span class="font-semibold text-primary">{{ data.studentName }}</span><br>
            🏫 ห้องเรียน: <span class="font-semibold text-primary">{{ data.location }}</span><br>
            ⏱ เวลาเรียน: <span class="font-semibold text-primary">{{ data.startTime }} - {{ data.endTime }}</span><br>
            ✅ สถานะเช็คอิน: <span class="font-semibold text-success">{{ data.checkinStatus }}</span><br>
            🕒 เวลาเช็คอิน: <span class="font-semibold text-primary">{{ formatTime(data.checkInTime) }}</span>
            </div>


            <div v-else class="text-center mt-4">
                <button class="btn btn-primary" @click="checkIn">เช็คอิน</button>
            </div>
            </div>

      </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const currentTime = ref('')
const data = ref(null)

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

 async function getCheckInData() {
    const accessToken = localStorage.getItem('accessToken')
    const studentId = localStorage.getItem('studentId')
    const subjectInfoId = sessionStorage.getItem('subjectInfoId')

    const response = await fetch('/api/class/checkinByStudentId/', {
        method: 'POST',
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, studentId, subjectInfoId }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)
    data.value = await response.json().resultData
    if (data.value.errorMessages) {
        alert(data.value.errorMessages,"คุณยังไม่ได้เช็คอิน")
    }
}

async function checkIn() {
    const accessToken = localStorage.getItem('accessToken')
    const studentId = localStorage.getItem('studentId')
    const subjectInfoId = sessionStorage.getItem('subjectInfoId')
    const checkinTime = new Date().toISOString()
    const response = await fetch('/api/class/checkin/', {
        
        method: 'POST',
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, studentId, subjectInfoId,checkinTime }),

    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)
    data.value = await response.json()
    if (data.value.errorMessages) {
        alert(data.value.errorMessages,"คุณยังไม่ได้เช็คอิน")
    }
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  getCheckInData();
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>