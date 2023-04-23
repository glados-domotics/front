<template>
  <div class="flex flex-col gap-5">
    <span class="text-indigo-600 font-bold text-2xl">Dashboard</span>
    <div class="card_container">
      <div
        class="card"
        v-for="entity in entities"
        :key="entity.id"
        @click="goTo('entity', entity.id)">
        <h2>{{ entity.name }}</h2>
        <span>Status:
          <span
            v-if="entity.status && entity.status !== 'unavailable'"
            :class="[entity.status === 'on' ? 'status-on' : 'status-off']">
            {{ entity.status }}</span>
          <span
            class="status-unknow"
            v-else>Inconnu</span>
        </span>
        <span>Type:
          <span v-if="entity.type">{{ entity.type }}</span>
          <span v-else>Inconnu</span>
        </span>
        <span>Valeur:
          <span v-if="entity.value">{{ entity.value }}</span>
          <span v-else>Inconnu</span>
        </span>
        <span>Pièce:
          <span v-if="entity.room">{{ entity.room.name }}</span>
          <span v-else>Inconnue</span>
        </span>
      </div>
    </div>
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
      isError: false
    }
  },
  methods: {
    goTo(name, id) {
      this.$router.push({
        name: name,
        params: { id: id }
      }
      )
    },
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
  },
}
</script>

<style scoped>

  .card_container {
    display: grid;
    gap: 15px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-items: center;
  }
  .card {
    display: flex;
    flex-direction: column;
    padding: 15px;
    background-color: '#F9F9FC';
    border-radius: 30px;
    width: 300px;
    height: 300px;
    transition: 200ms;
    box-shadow: 2px 2px 10px #e2e3e9;
  }

  .card h2 {
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
    font-size: 25px;
    margin-bottom: 20px;
  }

  .card span {
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card span .status-on {
    font-weight: bold;
    color: green;
  }

  .card span .status-off {
    font-weight: bold;
    color: red;
  }

  .card span .status-unknow {
    font-weight: bold;
    color: orangered;
  }

</style>