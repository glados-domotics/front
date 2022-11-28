<template>
  <div class="flex items-center justify-between w-full px-5">
    <Logo />
    <div class="text-lg flex gap-5">
      <span
        v-for="tab in tabs"
        :key="tab.name"
        @click="goTo(tab.name)"
        :class="[$route.name === tab.name ? activeClass : 'cursor-pointer hover:text-indigo-300', 'transition-colors duration-200 ease-in-out']">
        {{ tab.label }}
      </span>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/ui/Logo.vue"

export default {
  name: "Header",
  components: { Logo },
  data() {
    return {
      tabs: [
        {
          label: "Dashboard",
          name: "dashboard"
        },
        {
          label: "About",
          name: "about"
        }
      ]
    }
  },
  computed: {
    activeClass() {
      return "text-indigo-400 cursor-default font-bold"
    }
  },
  methods: {
    goTo(name) {
      this.$router.push({ name })
    }
  }
}
</script>