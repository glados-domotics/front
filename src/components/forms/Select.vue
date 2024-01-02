<template>
  <div>
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 my-3">{{ label }}</label>
    <div class="relative">
      <select
        @change="handleInput"
        id="countries"
        class="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option
          v-for="choice in choices"
          :key="choice.id"
          :value="choice.id"
          :selected="choice.id === modelValue">{{choice.label}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    modelValue: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    choices: {
      type: Array,
      default: null
    },
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      this.$emit("update:modelValue", value)

      event.stopPropagation()
    }
  }
}
</script>
