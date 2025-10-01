<template>
  <div class="h-full flex flex-col py-6 px-4 sidebar-custom fixed right-0 top-0 w-64 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg z-10 transition-transform duration-300">
    <nav class="flex flex-col space-y-2">
      <NuxtLink
        to="/Teacher/teacherData"
        class="sidebar-item"
        :class="$route.path === '/Teacher/teacherData' ? 'sidebar-item-active' : ''"
      >
        🏠 ข้อมูลอาจารย์
      </NuxtLink>
      <NuxtLink
        to="/admin/users"
        class="sidebar-item"
        :class="$route.path === '/admin/users' ? 'sidebar-item-active' : ''"
      >
        👥 Users
      </NuxtLink>
      <NuxtLink
        to="/admin/settings"
        class="sidebar-item"
        :class="$route.path === '/admin/settings' ? 'sidebar-item-active' : ''"
      >
        ⚙️ Settings
      </NuxtLink>
    </nav>
  </div>
</template>