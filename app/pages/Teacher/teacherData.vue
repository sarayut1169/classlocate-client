<!-- // app/pages/teacher/teacherData.vue -->
<template>
  <div class="container-fluid min-vh-100 bg-light d-flex flex-column font-prompt">
    <Sidebar class="position-fixed end-0 top-0 h-100 bg-white border-start shadow" />

    <div class="flex-grow-1 p-4">
      <div class="container mt-5">
        <div class="card shadow rounded-4 bg-white bg-opacity-75">
          <div class="card-body">
            <h2 class="card-title text-primary mb-4">ข้อมูลอาจารย์</h2>

            <div v-if="!isEditing">
              <p><strong class="text-primary">ชื่ออาจารย์:</strong> {{ data?.resultData?.name }}</p>
              <p><strong class="text-primary">สาขา:</strong> {{ data?.resultData?.major }}</p>
              <p><strong class="text-primary">ตำแหน่ง:</strong> {{ data?.resultData?.position }}</p>
              <p><strong class="text-primary">ประวัติ:</strong> {{ data?.resultData?.history }}</p>
              <button @click="startEdit" class="btn btn-primary mt-3">แก้ไขข้อมูล</button>
            </div>

            <div v-else>
              <div class="mb-3">
                <label class="form-label">ชื่ออาจารย์</label>
                <input v-model="editData.name" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">สาขา</label>
                <input v-model="editData.major" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">ตำแหน่ง</label>
                <input v-model="editData.position" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label">ประวัติ</label>
                <textarea v-model="editData.history" class="form-control" rows="4"></textarea>
              </div>

              <div class="d-flex gap-2 mt-3">
                <button @click="saveEdit" class="btn btn-success">บันทึก</button>
                <button @click="cancelEdit" class="btn btn-secondary">ยกเลิก</button>
              </div>
            </div>
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
const data = ref(null)
const isEditing = ref(false)
const editData = ref({
  name: '',
  major: '',
  position: '',
  history: ''
})

async function fetchTeacherData() {
  const userId = localStorage.getItem('userId')
  const accessToken = localStorage.getItem('accessToken')
  if (!userId) return

  try {
    const response = await fetch('/api/teacher/teacherDataApi/', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, accessToken }),
    })
    if(response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    data.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch teacher data:', error)
  }
}

onMounted(fetchTeacherData)

function startEdit() {
  isEditing.value = true
  editData.value = { ...data.value.resultData }
}

function cancelEdit() {
  isEditing.value = false
}

async function saveEdit() {
  try {
    const response = await fetch('/api/teacher/teacherUpdateApi/', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        accessToken: localStorage.getItem('accessToken'),
        updatedData: {
          name: editData.value.name,
          major: editData.value.major,
          position: editData.value.position,
          history: editData.value.history,
        }
      }),
    })
    if(response.status === 401) {
      localStorage.removeItem('accessToken')
      router.push('/login')
      return
    }
    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const result = await response.json()
    await fetchTeacherData()
    isEditing.value = false
  } catch (error) {
    console.error('Failed to update teacher data:', error)
  }
}

definePageMeta({
  layout: 'teacher',
  // middleware: ['auth'],
  title: 'ข้อมูลครู'
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700&display=swap');

.font-prompt {
  font-family: 'Prompt', sans-serif;
}
</style>