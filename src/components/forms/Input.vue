<template>
  <div>
    <label
      v-if="label"
      :for="prop"
      class="block text-sm font-medium text-gray-700 my-3">{{ label }}</label>
    <div class="relative">
      <input
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg border-gray-200 rounded-md placeholder-gray-300"
        type="text"
        autocomplete="off"
        :name="prop"
        :id="prop"
        :value="modelValue"
        :placeholder="placeholderValue"
        :class="{ 'pl-11': !!icon }"
        @input="handleInput" />
      <component
        :is="icon"
        v-if="icon"
        class="absolute left-0 inset-y-0 flex items-center pl-3 text-gray-300"/>
    </div>
  </div>
</template>

<script>
import { ref, toRef } from "vue"
import useWritingText from "@/composables/useWritingText"

export default {
  name: "Input",
  props: {
    modelValue: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    prop: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    placeholders: {
      type: Array,
      default: null
    },
    mask: {
      type: [Object, String],
      default: null
    }
  },
  setup(props) {
    const placeholders = toRef(props, "placeholders")
    let placeholderValue = useWritingText(placeholders)
    const input = ref(props.modelValue)
    return {
      placeholderValue,
      input
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      this.$emit("update:modelValue", value)
      this.$emit("input", value)

      event.stopPropagation()
    }
  }
}
</script>
