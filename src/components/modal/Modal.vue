<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-4 rounded-lg">
      <div class="mb-4">
        <!-- Contenu de la modal -->
        <slot></slot>
      </div>
      <div class="flex justify-end gap-2">
        <button
          @click="onCancel"
          class="px-4 py-2 rounded bg-gray-200">Annuler</button>
        <button
          @click="onConfirm"
          class="px-4 py-2 rounded bg-blue-500 text-white">Confirmer</button>
      </div>
    </div>
  </div>
</template>
        
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    onSuccess: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onCancel() {
      this.$emit("update:show", false)
    },
    onConfirm() {
      this.onSuccess()
      this.$emit("update:show", false)
    },
  },
}
</script>        