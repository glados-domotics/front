<template>
  <RoomForm
    :room="room"
    :showModal="showModal"
    :showModalToggle="showModalToggle"
    @update:rooms="() => {
      this.getRooms()
      this.getEntities()
    }"/>
  <DeviceForm
    :entity="entity"
    :showModal="showModalDevice"
    :showModalToggle="showModalDeviceToggle"
    :rooms="rooms.map(room => ({ id: room.id, label: room.name }))"
    @update:entity="() => {
      this.getEntities()
    }"/>
  <div class="flex flex-col gap-5">
    <span class="text-indigo-600 font-bold text-2xl">Dashboard</span>
    <div class="flex">
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        class="mr-3 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        @click="showModalDeviceToggle()">
        Nouvel appareil
      </button>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        @click="showModalToggle()">
        Nouvelle pièce
      </button>
    </div>
    <h1>Pièces : </h1>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="room in rooms"
        :key="room.id"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="p-5" >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ room.name }}
          </h5>
          <div class="flex flex-auto">
            <button
              @click="updateRoom(room)"
              class="block text-white mr-3 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
              Modifier
            </button>
            <button
              @click="deleteRooms(room.id)"
              class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
    <h1>Appareils : </h1>
    <div class="grid grid-cols-3 gap-3">
      <div></div>
      <Select
        label="Statut"
        :modelValue="entitiesFilters.status"
        :choices="[
          { id: '', label: 'Aucune' },
          { id: 'on', label: 'on' },
          { id: 'off', label: 'off' },
          { id: 'unavailable', label: 'unavailable' }
        ]"
        @update:modelValue="entitiesFilters.status = $event"/>

      <Select
        label="Pièce"
        :modelValue="entitiesFilters.room"
        :choices="[...rooms.map(room => ({ id: room.id, label: room.name })), { id: '', label: 'Aucune' }]"
        @update:modelValue="entitiesFilters.room = $event"/>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="entity in entities"
        :key="entity.id"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            class="rounded-t-lg"
            src="https://www.liquidleds.com.au/cdn/shop/articles/shutterstock_1211632039_2.jpg?v=1694539162&width=2000"
            alt="image"/>
        </a>
        <div
          class="p-5"
          :class="entity.status === 'on' ? 'bg-green-300' :  entity.status === 'off'  ? 'bg-yellow-300' : 'bg-red-300'">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ entity.name }}
            </h5>
            <p>{{entity.type}}</p>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Valeur : {{ entity.value ? entity.value : '-'}}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Date de création : {{ formatDate(entity.created_at) }}</p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Pièce : {{ entity.room?.name ?? '-' }}</p>
          <div class="flex flex-auto">
            <button
              @click="updateEntity(entity)"
              class="block text-white mr-3 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
              Modifier
            </button>
            <button
              @click="deleteEntity(entity.id)"
              class="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"
import DeviceForm from "@/components/dashboard/DeviceForm.vue"
import moment from "moment"
import RoomForm from "@/components/dashboard/RoomForm.vue"
import Select from "@/components/forms/Select.vue"

export default {
  name: "Dashboard",
  created() {
    this.getEntities()
    this.getRooms()
  },
  components: {
    Select,
    DeviceForm,
    RoomForm
  },
  data() {
    return {
      entities: [],
      rooms: [],
      isLoading: false,
      isError: false,
      showModal: false,
      showModalDevice: false,
      room: null,
      entity: null,
      entitiesFilters: {
        room: null,
        status: null
      }
    }
  },
  watch: {
    entitiesFilters: {
      handler: function (val) {

        Object.keys(val).forEach(key => {
          if (val[key] === null || val[key] === "") {
            delete val[key]
          }
        })


        var queryString = Object.keys(val).map(function (key) {
          return key + "=" + val[key]
        }).join("&")

        if (queryString) {
          queryString = "?" + queryString
        }
        this.getEntities(queryString)

      },
      deep: true
    }
  },
  methods: {
    getEntities(query) {
      this.isLoading = true
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Nous récupérons les appareils"))

      coreApi.glados.getEntities(query)
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
    getRooms() {
      coreApi.glados.getRooms()
        .then((rooms) => {
          this.rooms = rooms
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
        })
    },
    deleteRooms(id) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Piece supprimée"))

      coreApi.glados.deleteRooms(id)
        .then(() => {
          this.getRooms()
          this.getEntities()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
        })
    },
    deleteEntity(id) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Entité supprimée"))

      coreApi.glados.deleteEntity(id)
        .then(() => {
          this.getEntities()
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
        })
    },
    showModalToggle: function () {
      this.showModal = !this.showModal

      if(this.room) {
        this.room = null
      }

      if (this.showModal) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Nouvelle pièce"))
      }
    },
    showModalDeviceToggle: function () {
      this.showModalDevice = !this.showModalDevice

      if (this.entity) {
        this.entity = null
      }

      if (this.showModalDevice) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Nouvel appareil"))
      }
    },
    updateRoom(room) {
      this.room = room
      this.showModal = true
    },
    updateEntity(entity) {
      this.entity = entity
      this.showModalDevice = true
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY")
    }
  }
}
</script>
