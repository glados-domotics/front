<template>
  <button
    type="submit"
    :disabled="disabled || loading"
    class="
      inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600
      transition-colors duration-300
      hover:bg-indigo-500
      focus:bg-indigo-700 focus:outline-none
      disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
    :class="classes">
    {{ label }}
    <component :is="icon">
    </component>
    <span
      v-if="emoji"
      class="ml-4">{{ emoji }}</span>
    <loading
      v-if="loading"
      :size="18"
      class="animate-spin ml-2" />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: "normal"
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    emoji: {
      type: String,
      required: false
    }
  },
  computed: {
    classes() {
      const SIZES_MAP = { large: "uppercase text-2xl py-3 px-7 font-bold tracking-wider" }
      return SIZES_MAP[this.size] || ""
    }
  }
}
</script>

<style lang="scss" scoped>
</style>