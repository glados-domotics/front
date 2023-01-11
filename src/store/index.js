import { createStore } from "vuex"
import coreApi from "@/providers/core-api"

export default createStore({
  state: {
    entities: [],
    room: [],
    selectedEntity: null
  },
  getters: {
    getNestedEntities(state) {
      var entitiesByRoom = {}
      let index = 0
      state.entities.forEach(el => {
        if (!entitiesByRoom[el.room_id]){
          entitiesByRoom[el.room_id] = {id: el.room_id, name: `Room ${index + 1}`, entities: []}
          index++
        }
        entitiesByRoom[el.room_id].entities.push(el)
      })
      return entitiesByRoom
    }
  },
  mutations: {
    SET_ENTITIES(state, entities) {
      state.entities = entities
    },
    SET_SELECTED_ENTITY(state, entity) {
      state.selectedEntity = entity
    },
  },
  actions: {
    // ENTITIES
    fetchEntities(context){
      return new Promise((resolve, reject) => {
        coreApi.glados.getEntities()
          .then((entities) => {
            context.commit("SET_ENTITIES", entities)
            resolve(entities)
          })
          .catch((error) => {
            console.error(error)
            reject()
          })
      })
    },
    saveEntity(context){
      console.log(context)
      // return new Promise((resolve, reject) => {})
    },
  },
  modules: {},
})
