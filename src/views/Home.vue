<template>
  <div class="flex flex-col items-center gap-5 h-full overflow-hidden">
    <Header />
    <div class="bg-white rounded-md shadow-lg px-5 py-10 w-full flex-1 overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/navigations/Header.vue"

export default {
  name: "Home",
  components: { Header } 
}
</script>