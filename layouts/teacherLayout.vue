<template>
  <div class="flex min-h-screen font-[Prompt] bg-gradient-to-br from-blue-50 via-white to-orange-50">
    <Sidebar class="w-64 fixed right-0 top-0 h-full z-10 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg" />
    <div class="flex-1 p-6">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap');
</style>