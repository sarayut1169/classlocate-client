<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-100 via-white to-orange-100">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />

    <!-- รายละเอียดวิชา -->
    <div class="flex-grow p-6">
      <div class="container mt-5">
        <div class="card shadow rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">รายละเอียดวิชา</h4>

          <div v-if="subjectData?.resultData">
            <!-- ปุ่มแก้ไข -->
            <div class="text-end mb-3">
              <button v-if="!isEditingSubject" @click="enableEditSubject" class="btn btn-warning">แก้ไข</button>
            </div>

            <!-- แสดงข้อมูล -->
            <table v-if="!isEditingSubject" class="table table-bordered table-hover align-middle">
              <tbody>
                <tr>
                  <th scope="row">ชื่อวิชา</th>
                  <td>{{ subjectData.resultData.name }}</td>
                </tr>
                <tr>
                  <th scope="row">รหัสวิชา</th>
                  <td>{{ subjectData.resultData.subjectCode }}</td>
                </tr>
                <tr>
                  <th scope="row">ตำแหน่ง</th>
                  <td>
                    <div v-if="subjectData.resultData.location">
                      <div v-for="(label, index) in ['ซ้ายบน', 'ขวาบน', 'ซ้ายล่าง', 'ขวาล่าง']" :key="index">
                        {{ label }}: {{ JSON.parse(subjectData.resultData.location)[index]?.trim() }}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- แก้ไขข้อมูล -->
            <div v-else>
              <form @submit.prevent="saveChanges">
                <div class="mb-3">
                  <label class="form-label">ชื่อวิชา</label>
                  <input v-model="editData.name" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">รหัสวิชา</label>
                  <input v-model="editData.subjectCode" class="form-control" required />
                </div>

                <div class="mb-3">
                  <label class="form-label">ตำแหน่ง (4 ตำแหน่ง)</label>
                  <div v-for="(label, index) in ['ซ้ายบน', 'ขวาบน', 'ซ้ายล่าง', 'ขวาล่าง']" :key="index" class="mb-2">
                    <label>{{ label }}</label>
                    <input v-model="editData.location[index]" class="form-control" required />
                  </div>
                </div>

                <div class="text-end">
                  <button type="button" @click="cancelEditSubject" class="btn btn-secondary me-2">ยกเลิก</button>
                  <button type="submit" class="btn btn-success">บันทึก</button>
                </div>
              </form>
            </div>
          </div>

          <div v-else class="text-center text-muted">
            ไม่พบข้อมูลวิชา หรือข้อมูลไม่สมบูรณ์
          </div>
        </div>
      </div>
    </div>

    <!-- วันที่เรียน -->
    <div class="flex-grow p-6">


      <div class="container mt-5">
        <div class="card shadow-lg rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          
          <h4 class="mb-4 text-center text-primary fw-bold">วันที่เรียน</h4>

          <div class="table-responsive">
          <button
          class="btn btn-success rounded-pill shadow-sm px-4"
            @click="createSubjectInfo"
          >
            + เพิ่มวันเรียน
          </button>
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
                    <button v-if="!isEditingSubjectInfo" @click="editSubjectInfo(item)" class="btn btn-warning">แก้ไข</button>
                    <button class="btn btn-danger" @click="deleteSubjectInfo({ id:item.id })">ลบวันที่เรียน</button>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="isEditingSubjectInfo">
            <form @submit.prevent="saveSubjectInfoChanges">
              <div class="mb-3">
                <label class="form-label">วัน</label>
                <select v-model="editSubjectInfoData.day" class="form-select" required>
                  <option disabled value="">-- กรุณาเลือกวัน --</option>
                  <option value="1" >วันจันทร์</option>
                  <option value="2">วันอังคาร</option>
                  <option value="3">วันพุธ</option>
                  <option value="4">วันพฤหัสบดี</option>
                  <option value="5">วันศุกร์</option>
                  <option value="6">วันเสาร์</option>
                  <option value="7">วันอาทิตย์</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">เวลาเริ่มเรียน</label>
                <input v-model="editSubjectInfoData.leranStartTime" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">เวลาสิ้นสุดเรียน</label>
                <input v-model="editSubjectInfoData.leranEndTime" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">เวลาเริ่มเช็คชื่อ</label>
                <input v-model="editSubjectInfoData.startCheckIn" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label">เวลาสิ้นสุดเช็คชื่อ</label>
                <input v-model="editSubjectInfoData.endCheckIn" class="form-control" required />
              </div>

              <div class="text-end">
                <button type="button" @click="cancelSubjectInfoEdit" class="btn btn-secondary me-2">ยกเลิก</button>
                <button type="submit" class="btn btn-success">บันทึก</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import Sidebar from '../components/Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ตัวแปรพื้นฐาน
const subjectId = ref(null)
const accessToken = ref(null)
const router = useRouter()
const subjectData = ref(null)
const subjectInfo = ref(null)

// สถานะแก้ไข
const isEditingSubject = ref(false)
const isEditingSubjectInfo = ref(false)

// ตัวแปรเก็บข้อมูลที่จะแก้ไข
const editData = ref({
  name: '',
  subjectCode: '',
  location: ['', '', '', ''],
})

const editSubjectInfoData = ref({
  id: '',
  day: '',
  leranStartTime: '',
  leranEndTime: '',
  startCheckIn: '',
  endCheckIn: '',
})

// โหลดข้อมูลเมื่ออยู่บน client
onMounted(() => {
  subjectId.value = sessionStorage.getItem('subjectId')
  accessToken.value = localStorage.getItem('accessToken')

  if (!subjectId.value || !accessToken.value) return

  loadSubjectData()
  loadSubjectInfo()
})

// โหลดข้อมูลวิชา
async function loadSubjectData() {
  try {
    const response = await fetch('/api/subject/subjectById/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: subjectId.value, accessToken: accessToken.value }),
    })
    if(response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) throw new Error(`API error: ${response.status}`)

    subjectData.value = await response.json()
  } catch (error) {
    console.error('โหลดข้อมูลวิชาไม่สำเร็จ:', error)
    subjectData.value = null
  }
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
    if(response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const data = await response.json()
    subjectInfo.value = data.resultData
  } catch (error) {
    console.error('โหลดข้อมูลเวลาเรียนไม่สำเร็จ:', error)
    subjectInfo.value = null
  }
}

async function deleteSubjectInfo({ id }) {
  console.log('ID:', id);

  const accessToken = localStorage.getItem('accessToken');
  if (!id || !accessToken) {
    alert('ไม่พบข้อมูลที่จำเป็นสำหรับการลบ');
    return;
  }

  const shouldDelete = window.confirm('คุณต้องการลบวิชานี้?');
  if (!shouldDelete) return;

  try {
    const response = await fetch('/api/subject/subjectInfoDelete/', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Number(id), accessToken }),
    });
    if(response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) {
      throw new Error(`ลบไม่สำเร็จ: ${response.status}`);
    }

    const result = await response.json();
    console.log('DELETE RESULT:', result);

    alert('✅ ลบวิชาเรียบร้อยแล้ว');

    // ลบจาก state โดยไม่ reload
    subjectInfo.value = subjectInfo.value.filter(item => item.id !== id);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบวิชา:', error);
    alert('❌ ลบวิชาไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
  }
}


// แก้ไขรายละเอียดวิชา
function enableEditSubject() {
  if (!subjectData.value?.resultData) return
  isEditingSubject.value = true
  editData.value.name = subjectData.value.resultData.name
  editData.value.subjectCode = subjectData.value.resultData.subjectCode
  editData.value.location = JSON.parse(subjectData.value.resultData.location || '[]')
}

function cancelEditSubject() {
  isEditingSubject.value = false
}

async function saveChanges() {
  try {
    const response = await fetch('/api/subject/subjectUpdate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: subjectId.value,
        accessToken: accessToken.value,
        name: editData.value.name,
        subjectCode: editData.value.subjectCode,
        location: JSON.stringify(editData.value.location),
      }),
    })
    if(response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) throw new Error('บันทึกข้อมูลไม่สำเร็จ')

    const updated = await response.json()
    subjectData.value.resultData = updated.resultData
    isEditingSubject.value = false
  } catch (error) {
    console.error('เกิดข้อผิดพลาดระหว่างบันทึก:', error)
  }
}
function editSubjectInfo(item) {
  isEditingSubjectInfo.value = true
  editSubjectInfoData.value = { ...item }
}
function cancelSubjectInfoEdit() {
  isEditingSubjectInfo.value = false
}

function createSubjectInfo() {

  router.push('/subject/createSubjectInfo')
}

async function saveSubjectInfoChanges() {
  try {
    const url = '/api/subject/subjectInfoUpdate/'
    const body = {
      id: editSubjectInfoData.value.id,
      accessToken: accessToken.value,
      day: editSubjectInfoData.value.day,
      leranStartTime: editSubjectInfoData.value.leranStartTime,
      leranEndTime: editSubjectInfoData.value.leranEndTime,
      startCheckIn: editSubjectInfoData.value.startCheckIn,
      endCheckIn: editSubjectInfoData.value.endCheckIn,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if(response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }

    if (!response.ok) throw new Error('บันทึกข้อมูลเวลาเรียนไม่สำเร็จ')
    const updated = await response.json()
    const updatedItem = updated.resultData
    const index = subjectInfo.value.findIndex(item => item.id === updatedItem.id)
    if (index !== -1) {
      subjectInfo.value[index] = { ...updatedItem }
    }
    isEditingSubjectInfo.value = false
  } catch (error) {
    console.error('เกิดข้อผิดพลาดระหว่างบันทึกเวลาเรียน:', error)
  }
}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap');

.font-[Prompt] {
  font-family: 'Prompt', sans-serif;
}
</style>
