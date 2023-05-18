<template>
  <div class="flex flex-col gap-5">
    <div class="text-indigo-600 text-center font-normal text-6xl">Dashboard</div>
    <div class="overflow-auto">
      <EntityTable :entities="entities" />
    </div>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"
import EntityTable from "@/components/dashboard/EntityTable.vue"

export default {
  name: "Dashboard",
  components: { EntityTable },
  created() {
    this.getEntities()
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false 
    }
  },
  methods: { 
    getEntities() {
      this.isLoading = true

      coreApi.glados.getEntities()
        .then((entities) => {
          this.entities = entities
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  } 
}
</script>