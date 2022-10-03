<template>
  <div class="flex flex-col gap-5">
    <span class="text-indigo-600 font-bold text-2xl">Dashboard</span>
    <ul>
      <li
        @mouseover="hover = true"
        @mouseleave="hover = false"
        :class="{active:hover}"
        @click="redirection_link(entity.name)"
        v-for="entity in entities"
        :key="entity.id">
        {{ entity.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"

export default {
  name: "Dashboard",
  created() {
    this.getEntities()
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false,
      hover: false 
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
    },
    redirection_link(name){
      if (name == "Kitchen light 1"){ name = "kitchen_light1"}
      if (name == "Living room light 1"){ name = "livingroomlight1"}
      if (name == "Living room light 2"){ name = "livingroomlight2"}
      if (name == "Bedroom switch 1"){ name = "bedroom_switch"}
      if (name == "Bedroom light 1"){ name = "bedroom_light"}
      if (name == "Air conditioner"){ name = "air_conditioner"}
      this.$router.push("http://localhost:8080/" + name) 
    }
  } 
}
</script>


<style>

.active:hover{
  color: blue
}
</style>