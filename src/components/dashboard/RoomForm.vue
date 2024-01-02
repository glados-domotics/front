<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="overflow-y-auto  backdrop overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full flex"
    :class="{ 'hidden': !showModal }"
    aria-modal="true"
    role="dialog">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          @click="showModalToggle()"
          type="button"
          class="ml-5   absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal">
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
          </svg>
          <span
            class="sr-only"
            @click="showModalToggle()">Fermer</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <form
            id="app"
            @submit="checkForm"
            action="https://vuejs.org/"
            method="post">
            <h1 class="my-5">Pièce</h1>
            <div
              v-if="error"
              class="p-4 mb-4  mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert">
              <span class="font-medium">{{error}}</span>
            </div>
            <Input
              label="Nom"
              :modelValue="form.name"
              :placeholders="['Bedroom', 'Kitchen', 'Living room', 'Bathroom']"
              prop="name"
              @update:modelValue="form.name = $event"/>
            <p>
              <input
                class="mx-auto mt-3 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
                :value="form.id !== '' ? 'Modifier' : 'Ajouter'">
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import coreApi from "@/providers/core-api"
import Input from "@/components/forms/Input.vue"
export default {
  name: "RoomForm",
  components: { Input },

  props: {
    room: {
      type: [Object, String],
      default: null
    },
    showModal: {
      type: Boolean,
      default: false
    },
    showModalToggle: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      form: this.room ?? {
        name: "",
        id: ""
      },
      error: null,
    }
  },
  watch: {
    room: {
      handler: function (val) {
        this.form =  {
          name: val?.name ?? "",
          id: val?.id ?? ""
        }
      },
      deep: true
    }
  },
  methods: {
    checkForm: function (e) {
      e.preventDefault()

      this.error = null
      if (!this.form.name || this.form.name === "") {
        this.error = "Nom requis."
        return
      }

      if(this.form.id !== "") {
        coreApi.glados.editRoom(this.form.id , { name: this.form.name }).then(() => {
          this.showModalToggle()
          this.$emit("update:rooms")
        })
          .catch((error) => {
            this.error = error.data.errors
          })
      } else {
        coreApi.glados.createRoom({ name: this.form.name })
          .then(() => {
            this.showModalToggle()
            this.$emit("update:rooms")
          })
          .catch((error) => {
            this.error = error.data.errors
          })
      }
    }
  }
}
</script>
