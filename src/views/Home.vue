<template>
  <div class="flex flex-col items-center gap-5 h-full">
    <Header />
    <div class="bg-white rounded-md shadow-lg px-10 md:px-24 py-10 w-full md:w-5/6 flex-1">
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