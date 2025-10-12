<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />
    
    <div class="flex-grow p-6">
      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-primary p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">เพิ่มนักศึกษา</h4>

          <form @submit.prevent="handleSaveNewStudent">
            <div class="mb-3">
              <label class="form-label">ชื่อ-นามสกุล</label>
              <input v-model="newStudent.studentName" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">รหัสนักศึกษา</label>
              <input v-model="newStudent.studentId" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label">สาขา</label>
              <input v-model="newStudent.major" class="form-control" required />
            </div>

            <div class="text-end">
              <button type="button" @click="handleCancelCreate" class="btn btn-secondary me-2">ยกเลิก</button>
              <button type="submit" class="btn btn-success">บันทึก</button>
            </div>
          </form>
        </div>
      </div>
    </div>

<div class="flex-grow p-6">
  <div class="container mt-5">
    <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-primary p-4">
      <h4 class="mb-4 text-center text-primary fw-bold">เพิ่มนักศึกษาด้วย EXCEL</h4>
    <figure class="text-center">
      <blockquote class="blockquote">
        <h4 class="mb-1 text-primary fw-bold">ตัวอย่างการรูปแบบ Excel นักศึกษา</h4>
      </blockquote>
      <img src="/ex_excel.png" alt="Excel Logo" class="rounded mx-auto d-block">
    </figure>

      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="excelFile" class="form-label">เลือกไฟล์ Excel (.xlsx)</label>
            <input type="file" id="excelFile" class="form-control" @change="handleFileChange" />
          </div>

          <div class="d-grid gap-2 mt-3" v-if="file">
            <button @click="handleUploadFile" class="btn btn-success rounded-pill">
              📤 อัพโหลดไฟล์
            </button>              

          </div>
        <button type="button" @click="handleCancelCreate" class="btn btn-secondary me-2">ยกเลิก</button>
        </div>
      </div>
    </div>
  </div>
</div>



  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const file = ref(null)

const newStudent = ref({
  studentName: '',
  studentId: '',
  major: '',
})

async function handleSaveNewStudent() {
  try {
    const response = await fetch('/api/student/studentCreate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subjectId :sessionStorage.getItem('subjectId'),
        accessToken: localStorage.getItem('accessToken'),
        ...newStudent.value,
      }),
    })

    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse?.message || 'บันทึกข้อมูลไม่สําเร็จ')
    }

    router.push('/class/classinfo')
  } catch (error) {
    console.error('บันทึกข้อมูลไม่สําเร็จ:', error)
  }
}

function handleCancelCreate() {
  router.push('/class/classinfo')
}


      const handleFileChange = (e) => {
        file.value = e.target.files[0]
      }

const handleUploadFile = async () => {
  if (!file.value) {
    alert('กรุณาเลือกไฟล์ Excel ก่อนอัปโหลด')
    return
  }

  const subjectId = sessionStorage.getItem('subjectId')
  const accessToken = localStorage.getItem('accessToken')

  if (!subjectId || !accessToken) {
    alert('ไม่พบ subjectId หรือ accessToken')
    return
  }

    console.log("FILE:", file.value);
    
    
    const response = await fetch('/api/student/studentByExcel/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subjectId: subjectId,excelFile: file, accessToken: accessToken.value }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const data = await response.json()
  }


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:initial,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>
