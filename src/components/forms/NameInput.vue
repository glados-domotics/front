<template>
  <Input
    label="name"
    icon="account-outline"
    :placeholders="['Pierre-Alexandre', 'P-A', 'Barbouy', 'Front-end Developer']"
    prop="name" />
</template>

<script>
import Input from "@/components/forms/Input.vue"

export default {
  name: "NameInput",
  components: { Input }
}
</script>
