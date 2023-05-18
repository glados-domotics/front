<template>
  <div 
    :class="`text-sm text-black cursor-pointer font-normal py-2 whitespace-nowrap text-center rounded-full ${getStatusColors(editedStatus)}`"
    @click="toggleStatus">
    {{ editedStatus }}
  </div>
</template>

<script>
export default {
  name: "StatusPill",
  emits: ["toggleStatus"],
  data() {
    return { editedStatus: this.status }
  },
  props: {
    status: {
      type: String,
      required: true
    }
  },
  methods: {
    getStatusColors(status) {
      const statusToColors = {
        on: "bg-green-300",
        off: "bg-red-300",
        unavailable: "bg-gray-300"
      }
      return statusToColors[status]
    },
    toggleStatus() {
      if(this.editedStatus === "unavailable") return
      const newStatus = this.editedStatus === "on" ? "off" : "on"
      this.editedStatus = newStatus
      this.$emit("toggleStatus", newStatus)
    }
  }
}
</script>