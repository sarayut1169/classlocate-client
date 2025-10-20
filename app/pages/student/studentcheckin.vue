<!-- // app/pages/Teacher/teacherHomepage.vue -->
<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />

    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-lg bg-white border-primary border-opacity-50">
            <div class="card-body">
              <h4 class="card-title text-center text-primary fw-bold mb-4">
                เช็คอิน
              </h4>

              <!-- Current Time -->
              <p class="text-center text-muted mb-4">
                ⏰ เวลาปัจจุบัน: <span class="fw-semibold text-primary">{{ currentTime }}</span>
              </p>

              <!-- Error Message -->
              <div v-if="errorMessages" class="alert alert-danger text-center fw-bold" role="alert">
                {{ errorMessages }}
                <br>
                <button
                  v-if="!shouldHideCheckInButton"
                  class="btn btn-primary btn-lg px-4"
                  @click="checkIn"
                >
                  เช็คอินตอนนี้
                </button>
              </div>


              <!-- Already Checked In -->
              <div v-else-if="data">
                <p class="text-center text-success fw-bold">คุณได้เช็คอินแล้ว</p>
                
                <ul class="list-group list-group-flush mt-3">
                  <li class="list-group-item">
                    <strong>📌 รหัสนักเรียน:</strong> <span class="text-primary">{{ data.studentId }}</span>
                  </li>
                  <li class="list-group-item">
                    <strong>👤 ชื่อ:</strong> <span class="text-primary">{{ data.studentName }}</span>
                  </li>
                  <li class="list-group-item">
                    <strong>✅ สถานะเช็คอิน:</strong> <span class="badge bg-success">{{ data.checkinStatus }}</span>
                  </li>
                  <li class="list-group-item">
                    <strong>🕒 เวลาเช็คอิน:</strong> <span class="text-primary">{{ data.checkInTime }}</span>
                  </li>
                  <li class="list-group-item">
                    <strong>📝 รายละเอียด:</strong> <span class="text-primary">{{ data.description }}</span>
                  </li>
                </ul>
              </div>

              <!-- Check-In Button -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../components/StudentSidebar.vue'

definePageMeta({
  middleware: ['auth']
})



const currentTime = ref('')
const data = ref(null)
const errorMessages = ref(null)
const shouldHideCheckInButton = ref(false)

// แปลง ISO string เป็นเวลาแบบ HH:mm:ss
function formatTime(isoString) {
  if (!isoString) return '-'
  const date = new Date(isoString)
  return date.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// อัปเดตเวลาปัจจุบันทุกวินาที
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// ดึงข้อมูลเช็คอิน
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

  const result = await response.json()
    if (result.errorMessages) {
      errorMessages.value = result.errorMessages
    if (
      errorMessages.value === 'ไม่สามารถเช็คอินได้ ยังไม่ถึงวันที่เรียน' ||
      errorMessages.value === 'ไม่สามารถเช็คอินได้ เวลาไม่ถูกต้อง' ||
      errorMessages.value === 'ไม่สามารถเช็คอินได้ คุณขาดเรียน เนื่องจากไม่ได้เข้าเรียนตามเวลาที่กำหนด'
    ) {
    shouldHideCheckInButton.value = true
    }
    } else {
      data.value = result.resultData
    }
}

// เช็คอิน
async function checkIn() {
  const accessToken = localStorage.getItem('accessToken')
  const studentId = localStorage.getItem('studentId')
  const subjectInfoId = sessionStorage.getItem('subjectInfoId')

  // ดึงตำแหน่งจาก browser
  if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const response = await fetch('/api/class/checkin/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        studentId,
        subjectInfoId,
        location: { latitude, longitude }
      }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)
    const result = await response.json()
    location.reload()
    if (result.errorMessages) {
      errorMessages.value = result.errorMessages
    } else {
      data.value = result.resultData
      await getCheckInData()
    }
  }, (error) => {
    errorMessages.value = 'ไม่สามารถดึงตำแหน่งจากอุปกรณ์ได้'
    console.error('Geolocation error:', error)
  })
  }
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  getCheckInData()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>