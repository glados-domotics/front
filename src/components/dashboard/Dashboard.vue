<template>
  <div class="flex flex-col gap-5">
    <span class="text-indigo-600 font-bold text-2xl">Dashboard</span>
    <ul>
      <li 
        v-for="entity in entities"
        :key="entity.id">
        <component :is="getIconComponent(entity.name)">
        </component>
        <Button 
          class="mb-2"
          @click="openModal(entity)"
          :label="entity.name">
        </Button>
        <Modal
          :show="showModal"
          :onSuccess="handleSuccess"
          @update:show="showModal = $event">
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-sm font-bold mb-2">Type</label>
              <div class="p-2 bg-gray-100 rounded">{{ selectedEntity.type }}</div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-bold mb-2">Name</label>
              <div class="p-2 bg-gray-100 rounded">{{ selectedEntity.name }}</div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-bold mb-2">Value</label>
              <input
                v-model="selectedEntity.value"
                type="text"
                class="w-full p-2 border rounded"
                required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-bold mb-2">Status</label>

              <label
                for="toggle"
                class="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle"
                  class="sr-only peer"
                  v-model="isSwitchOn"
                  :disabled="selectedEntity.status === 'unavailable'">
                <div class="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
              </label>


            </div>
            <button
              type="submit"
              class="px-4 py-2 rounded bg-blue-500 text-white">Save</button>
          </form>
        </Modal>
      </li>
    </ul>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"
import Button from "@/components/buttons/Button"
import Modal from "@/components/modal/Modal"
import AirConditionerIcon from "@/components/icons/airConditioner"
import BedroomIcon from "@/components/icons/bedRoom"
import KitchenIcon from "@/components/icons/Kitchen"
import LivingRoomIcon from "@/components/icons/livingRoom"
import TelevisionIcon from "@/components/icons/Television"
import ThermometerIcon from "@/components/icons/Temperature"

export default {
  name: "Dashboard",
  created() {
    this.getEntities()
  },
  components: {
    Button,
    Modal,
    AirConditionerIcon,
    BedroomIcon,
    KitchenIcon,
    LivingRoomIcon,
    TelevisionIcon,
    ThermometerIcon,
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false,
      showModal: false,
      selectedEntity: {}
    }
  },
  computed: {
    isSwitchOn: {
      get() {
        return this.selectedEntity.status === "on"
      },
      set(value) {
        this.selectedEntity.status = value ? "on" : "off"
      }
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
    getIconComponent(entityName) {
      switch (entityName) {
        case "Air conditioner":
          return "AirConditionerIcon"
        case "Bedroom switch 1":
        case "Bedroom light 1":
          return "BedroomIcon"
        case "Kitchen light 1":
          return "KitchenIcon"
        case "Living room light 1":
        case "Living room light 2":
          return "LivingRoomIcon"
        case "Television":
          return "TelevisionIcon"
        case "Thermometer":
          return "ThermometerIcon"
        default:
          return null
      }
    },
    handleSuccess() {
      console.log("Action confirmée")
    },
    openModal(entity) {
      this.showModal = true,
      this.selectedEntity = entity
    }
  }
}
</script>