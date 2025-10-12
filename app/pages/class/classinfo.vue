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
                      <button class="btn btn-sm btn-warning rounded-pill shadow-sm px-3" @click="goToSeeData({ id: item.id })" >แสดงการเข้าห้องเรียน</button>
                      <!-- <NuxtLink
                        :to="{ path: '/class/classdata' }"
                        class="btn btn-sm btn-warning rounded-pill shadow-sm px-3"
                        @click.native="sessionStorage.setItem('subjectInfoId', item.id)"
                      >
                        แสดงการเข้าห้องเรียน
                      </NuxtLink> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <br>


        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          
          <h4 class="mb-4 text-center text-primary fw-bold">รายชื่อนักศึกษา</h4>

          <div class="table-responsive">
            <button
            class="btn btn-success rounded-pill shadow-sm px-4"
              @click="createStudent"
            >
              + เพิ่มนักศึกษา
            </button>
            <br>
                 <br>
            <table class="table table-bordered table-striped table-hover align-middle">
              <thead class="table-info text-center">
                <tr>
                  <th scope="col">ชื่อ-นามสกุล</th>
                  <th scope="col">รหัสนักศึกษา</th>
                  <th scope="col">สาขา</th>
                  <th scope="col">แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in studentInfo"
                  :key="index"
                  class="text-center"
                >
                  <td>{{ item.studentName }}</td>
                  <td>{{ item.studentId }}</td>
                  <td>{{ item.major }}</td>
                  <td>
                 <button v-if="!IsEditStudent" @click="editStudent(item)" class="btn btn-warning">แก้ไข</button>
                      <button class="btn btn-sm btn-danger rounded-pill shadow-sm px-3" @click="deleteStudent({ id: item.id })" >ลบ</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>



        </div>

        <br>
        
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4" v-if="IsEditStudent">
          <h4 class="mb-4 text-center text-primary fw-bold">แก้ไขข้อมูลนักศึกษา</h4>

            <div >
            <form @submit.prevent="saveStudentInfo">
              <!-- <div class="mb-3">
                <label class="form-label">ID</label>
                <input v-model="editStudentData.id" class="form-control" required />
              </div> -->

              <hidden v-model="editStudentData.id" />

              <div class="mb-3">
                <label class="form-label">ชื่อ-นามสกุล</label>
                <input v-model="editStudentData.studentName" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">รหัสนักศึกษา</label>
                <input v-model="editStudentData.studentId" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">สาขา</label>
                <input v-model="editStudentData.major" class="form-control" required />
              </div>

              <div class="text-end">
                <button type="button" @click="cancelStudentInfoEdit" class="btn btn-secondary me-2">ยกเลิก</button>
                <button type="submit" class="btn btn-success">บันทึก</button>
              </div>
            </form>
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
import { useRouter } from 'vue-router'

import Sidebar from '../components/Sidebar.vue'

const router = useRouter()
const subjectId = ref(null)
const accessToken = ref(null)
const subjectInfo = ref(null)
const studentInfo = ref(null)
const isEditingSubjectInfo = ref(false)
const IsEditStudent = ref(false)


const editStudentData = ref({
  id: '',
  studentName: '',
  studentId: '',
  major: '',
})



onMounted(async () => {
  subjectId.value = sessionStorage.getItem('subjectId')
  accessToken.value = localStorage.getItem('accessToken')

  if (!subjectId.value || !accessToken.value) return

  await loadStudentInfo()
  await loadSubjectInfo()
})

function createStudent() {
  sessionStorage.setItem('subjectId', subjectId.value)
  router.push('/class/addstudent')
}

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


async function saveStudentInfo() {
  try {
    const url = '/api/student/studentUpdate/'
    const body = {
      id: editStudentData.value.id,
      studentName: editStudentData.value.studentName,
      studentId: editStudentData.value.studentId,
      major: editStudentData.value.major,
      accessToken: accessToken.value,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) throw new Error('บันทึกข้อมูลไม่สําเร็จ')

    const updated = await response.json()
    const updatedItem = updated.resultData

    const index = subjectInfo.value.findIndex(item => item.id === updatedItem.id)
    if (index !== -1) {
      subjectInfo.value[index] = { ...updatedItem }
    }

    IsEditStudent.value = false

    // ✅ reload หน้าเว็บ
    location.reload()
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error)
  }
}


async function loadStudentInfo() {
  try {
    const response = await fetch('/api/student/studentBySubjectId/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subjectId: subjectId.value, accessToken: accessToken.value }),
    })

    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const data = await response.json()
    studentInfo.value = data.resultData
  } catch (error) {
    console.error('โหลดข้อมูลนักศึกษาไม่สำเร็จ:', error)
    studentInfo.value = null
  }
}

function cancelStudentInfoEdit() {
  IsEditStudent.value = false
}

function editStudent(item) {
  IsEditStudent.value = true
  editStudentData.value = { ...item }
}

function goToSeeData({id}) {
  sessionStorage.setItem('subjectInfoId', id)
  // navigateTo('/class/classdata')
  router.push('/class/classdata')
}

</script>

