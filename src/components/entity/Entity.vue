<template>
  <div class="flex flex-col gap-5">
    <span class="text-indigo-600 font-bold text-2xl">Entity</span>
    <h1>Formilaire de modification de l'entité : {{ entity_id }}</h1>
    <div
      class="container"
      v-for="entity in entities"
      :key="entity.id">
      <form
        id="entity"
        @submit="updateEntity">
        <div>
          <b>Nom :</b>
          <input
            type="text"
            v-model="entity.name"
            ref="nameRef"/>
        </div>
        <div>
          <b>Status :</b>
          <div>
            <input
              type="checkbox"
              v-model="status"
              ref="statusRef"/>
          </div>
        </div>
        <div>
          <b>Type :</b>
          <input
            type="text"
            v-model="entity.type"
            ref="typeRef"/>
        </div>
        <div>
          <b>Value :</b>
          <input
            type="text"
            v-model="entity.value"
            ref="valueRef"/>
        </div>
        <div>
          <b>Pièce :</b>
          <select
            class="form-control"
            v-model="roomselected"
            ref="roomRef">
            <option
              v-for="room in rooms"
              :key="room.id"
              :value="room.id">
              {{ room.name }}
            </option>
          </select>
        </div>
        <input
          type="submit"
          value="Envoyer" />
      </form>
    </div>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"

export default {
  name: "Entity",
  created() {
    this.getEntity(),
    this.getRooms()
  },
  data() {
    return {
      entities: [],
      rooms: [],
      roomselected: "",
      status: false,
      entity_id: this.$route.params.id,
      isLoading: false,
      isError: false
    }
  },
  methods: {
    updateEntity() {
      const entity_id = this.$route.params.id
      const data = JSON.stringify({
        name: this.$refs.nameRef[0].value,
        type: this.$refs.typeRef[0].value,
        status: this.status,
        value: this.$refs.valueRef[0].value,
        room: this.$refs.roomRef[0].value
      })
      coreApi.glados.updateEntity(entity_id, data)
    },
    getEntity() {
      this.isLoading = true
      const entity_id = this.$route.params.id
      coreApi.glados.getEntity(entity_id)
        .then((entities) => {
          this.entities = entities
          if (entities[0].room) {
            this.roomselected = entities[0].room.id
          }
          if (entities[0].status === "on") {
            this.status = true
          }
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
      this.isLoading = true
      coreApi.glados.getRooms()
        .then((rooms) => {
          this.rooms = rooms
        })
        .catch((error) => {
          console.log(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
}
</script>

<style scoped>

h1 {
  text-align: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

form div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}

form div input[type="text"], form div select, form div div {
  width: 90%;
}

form div div {
  width: 89%;
}


input[type="submit"] {
  border: 1px solid rgb(79 70 229);
  padding: 5px 15px;
  color: #fff;
  background-color: rgb(79 70 229);
}

input[type="submit"]:hover {
  color: rgb(79 70 229);
  background-color: transparent;
  cursor: pointer;
}

</style>