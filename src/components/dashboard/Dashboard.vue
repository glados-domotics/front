<template>
  <div class="flex flex-col gap-5">
    <div class="text-indigo-600 text-center font-normal text-6xl">Dashboard</div>
    <button 
      :class="buttonClass"
      @click="audioReport">Audio Report !</button>
    <div class="overflow-auto">
      <EntityTable :entities="entities" />
    </div>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"
import EntityTable from "@/components/dashboard/EntityTable.vue"
import makeSpeechText from "@/utils/speech.js"


export default {
  name: "Dashboard",
  components: { EntityTable },
  mounted() {
    this.emitter.on("entityUpdated", async ( entity ) => {
      this.updateEntity(entity)
        .then(() => this.getEntities())
    })
  },
  computed: {
    buttonClass() {
      return this.speech 
        ? "bg-gray-500 text-white font-bold py-2 px-4 rounded-full max-w-sm mx-auto block cursor-not-allowed"  
        : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full max-w-sm mx-auto block" 
    }
  },
  created() {
    this.getEntities()
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false,
      speech: false
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
    updateEntity(newEntity) {
      this.isLoading = true

      return coreApi.glados.updateEntity(newEntity)
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    audioReport() {
      this.speech = true
      let utter = new SpeechSynthesisUtterance()
      utter.text = makeSpeechText(this.entities)
      utter.onend = () => {
        this.speech = false
      }
      window.speechSynthesis.speak(utter)
    }
  } 
}
</script>