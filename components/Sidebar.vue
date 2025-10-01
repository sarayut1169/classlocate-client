<!-- // layouts/components/Sidebar.vue -->
<template>
  <div class="h-full flex flex-col py-6 px-4 space-y-6" align="center">
    <nav class="space-y-6">
      <NuxtLink to="/Teacher/teacherData" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700 font-medium">ข้อมูลอาจารย์</NuxtLink>
      <NuxtLink to="/admin/users" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Users</NuxtLink>
      <NuxtLink to="/admin/settings" class="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Settings</NuxtLink>
    </nav>
  </div>
</template>
<style>

</style>
