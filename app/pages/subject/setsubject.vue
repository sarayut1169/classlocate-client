<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-100 via-white to-orange-100">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />

    <div class="flex-grow p-6">
      <div class="container mt-5">
        <div class="card shadow rounded-4 bg-white bg-opacity-80 border border-gray-300 p-4">
          <h4 class="mb-4 text-center text-primary fw-bold">รายละเอียดวิชา</h4>

          <div v-if="subjectData?.resultData">
            <table class="table table-bordered table-hover align-middle">
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
                  <td>{{ subjectData.resultData.location }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="text-center text-muted">
            ไม่พบข้อมูลวิชา หรือข้อมูลไม่สมบูรณ์
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const subjectData = ref(null)

const raw = route.query.subjectData

try {
  subjectData.value = raw ? JSON.parse(decodeURIComponent(raw)) : null
  console.log('subjectData:', subjectData.value)
} catch (error) {
  console.error('ไม่สามารถแปลงข้อมูล subjectData ได้:', error)
  subjectData.value = null
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap');

.font-[Prompt] {
  font-family: 'Prompt', sans-serif;
}
</style>