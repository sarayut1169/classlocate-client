<template>
  <div class="flex min-h-screen font-prompt bg-gradient-to-br from-blue-100 via-white to-orange-100">
    <!-- Sidebar -->
    <Sidebar class="fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />

    <div class="flex-grow p-6">
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-primary p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">สร้างวันที่เรียนใหม่</h4>

          <form @submit.prevent="saveNewSubjectInfo">
            <div class="mb-3">
              <label class="form-label">วัน</label>
              <select v-model="newSubjectInfo.day" class="form-select" required>
                <option disabled value="">-- กรุณาเลือกวัน --</option>
                <option v-for="(day, index) in days" :key="index" :value="index">
                  {{ day }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">เวลาเริ่มเรียน</label>
              <input type="time" v-model="newSubjectInfo.leranStartTime" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">เวลาสิ้นสุดเรียน</label>
              <input type="time" v-model="newSubjectInfo.leranEndTime" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">เวลาเริ่มเช็คชื่อ</label>
              <input type="time" v-model="newSubjectInfo.startCheckIn" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">เวลาสิ้นสุดเช็คชื่อ</label>
              <input type="time" v-model="newSubjectInfo.endCheckIn" class="form-control" required />
            </div>

            <div class="text-end">
              <button type="button" @click="cancelSubjectInfoCreate" class="btn btn-secondary me-2">ยกเลิก</button>
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

const newSubjectInfo = ref({
  subjectId: '',
  day: '',
  leranStartTime: '',
  leranEndTime: '',
  startCheckIn: '',
  endCheckIn: '',
})

const days = ref([
  'วันจันทร์',
  'วันอังคาร',
  'วันพุธ',
  'วันพฤหัสบดี',
  'วันศุกร์',
  'วันเสาร์',
  'วันอาทิตย์',
])

async function saveNewSubjectInfo() {
  const subjectId = sessionStorage.getItem('subjectId')
  const accessToken = localStorage.getItem('accessToken')

  if (!subjectId || !accessToken) {
    alert('ไม่พบข้อมูลผู้ใช้')
    return
  }

  try {
    const response = await fetch('/api/subject/subjectInfoCreate/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subjectId : Number(subjectId), 
        accessToken,
        day: Number(newSubjectInfo.value.day), 
        leranStartTime: newSubjectInfo.value.leranStartTime,
        leranEndTime: newSubjectInfo.value.leranEndTime,
        startCheckIn: newSubjectInfo.value.startCheckIn,
        endCheckIn: newSubjectInfo.value.endCheckIn
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    else{
    alert('สร้างวิชาเรียบร้อยแล้ว')
    router.push('/subject/setsubject')
    }

  } catch (error) {
    console.error('Error creating subject:', error)
    alert('เกิดข้อผิดพลาดในการสร้างวิชา')
  }
}

function cancelSubjectInfoCreate() {
  router.push('/subject/subject')
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700&display=swap');

.font-prompt {
  font-family: 'Prompt', sans-serif;
}
</style>
