<template>
    <div class="p-3 bg-dark text-white">
      <div class="flexMain">
        <div class="flex1">
    
        </div>

        <div class="flex1">
    
        </div>
      </div>
    </div>

  <div id="menuHolder">
    <div role="navigation" class="sticky-top border-bottom border-top" id="mainNavigation">
      <div class="flexMain bg-[#2563eb] text-white">
        <div class="flex2">
          <button class="siteLink menuBtn" onclick="menuToggle()">
            <i class="fas fa-bars me-2"></i> MENU
          </button>
        </div>
        <div class="flex3 text-center" id="siteBrand">CLASS LOCATE</div>
        <div class="flex2 text-end d-block d-md-none">
          <button class="siteLink menuBtn"><i class="fas fa-search"></i></button>
        </div>
        <div class="flex2 text-end d-none d-md-block">
            <button class="siteLink logoutBtn" @click="logout">Logout</button>
        </div>
      </div>
    </div>

    <div id="menuDrawer">
      <div class="p-4 border-bottom bg-white">
        <div class="row">
          <div class="col text-end">
            <i class="fas fa-times text-orange-500" role="btn" onclick="menuToggle()"></i>
          </div>
        </div>
      </div>
      <div>
        <NuxtLink to="/student/studenthomepage" class="nav-menu-item">ห้องเรียน</NuxtLink>
   

      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700&display=swap');

.font-prompt {
  font-family: 'Prompt', sans-serif;
}

.flexMain {
  display: flex;
  align-items: center;
}
.flex1 { flex: 1 }
.flex2 { flex: 2 }
.flex3 { flex: 3 }

button.siteLink {
  border: none;
  padding: 20px;
  display: inline-block;
  min-width: 115px;
  font-weight: bold;
}

.menuBtn {
  background-color: #1e3a8a;
  color: #fb923c;
  border-radius: 0;
}
.menuBtn:active {
  background-color: #fb923c;
  color: white;
}
.logoutBtn {
  background-color: #1e3a8a;
  color: white;
  transition: all 300ms linear;
}
.logoutBtn:active {
  background-color: #f97316;
  color: white;
}

#siteBrand {
  font-family: 'Prompt', sans-serif;
  font-size: 28px;
  color: #f97316;
  font-weight: bold;
  letter-spacing: -0.5px;
}

#menuDrawer {
  background: #f8fafc;
  position: fixed;
  height: 100vh;
  overflow: auto;
  z-index: 12312;
  top: 0;
  left: 0;
  border-right: 1px solid #eaeaea;
  min-width: 25%;
  max-width: 320px;
  width: 100%;
  transform: translateX(-100%);
  transition: transform 200ms linear;
}
#mainNavigation {
  transition: transform 200ms linear;
}
.drawMenu > #menuDrawer {
  transform: translateX(0%);
}
.drawMenu > #mainNavigation {
  transform: translateX(25%);
}
.fa-times {
  cursor: pointer;
  font-size: 20px;
}

a.nav-menu-item {
  transition: border 200ms linear;
  text-decoration: none;
  display: block;
  padding: 18px 32px;
  border-bottom: 1px solid #eaeaea;
  font-weight: bold;
  color: #1e3a8a;
}
a.nav-menu-item:hover {
  margin-left: 2px;
  border-left: 10px solid #f97316;
  background-color: #fef3c7;
}
</style>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  const confirmed = window.confirm('คุณต้องการออกจากระบบใช่หรือไม่?')
  if (confirmed) {
    localStorage.removeItem('token')
    router.push('/login')
  }
}

onMounted(() => {
  const menuHolder = document.getElementById('menuHolder')
  const siteBrand = document.getElementById('siteBrand')

  function menuToggle() {
    menuHolder.className = menuHolder?.className === 'drawMenu' ? '' : 'drawMenu'
  }

  if (window.innerWidth < 426 && siteBrand) {
    siteBrand.innerHTML = 'MAS'
  }

  window.onresize = () => {
    if (!siteBrand) return
    siteBrand.innerHTML = window.innerWidth < 420 ? 'MAS' : 'CLASS LOCATE'
  }

  window.menuToggle = menuToggle
})
</script>