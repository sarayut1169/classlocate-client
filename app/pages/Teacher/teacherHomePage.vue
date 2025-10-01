<!-- 
//Teacher/teacherHomePage.vue -->
<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <!-- Main content ด้านซ้าย -->
    <main class="flex-1 p-8 overflow-auto transition-all duration-300 mr-64">
      <div class="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6">
        <NuxtPage />
      </div>
    </main>

    <!-- Sidebar ด้านขวา -->
    <Sidebar class="w-64 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg fixed right-0 top-0 h-full z-10 transition-transform duration-300" />
  </div>
</template>

<script setup>
import Sidebar from '../layouts/components/Sidebar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap');

</style>