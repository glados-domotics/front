import coreApi from "@/providers/core-api"
import { createStore } from "vuex"

var myHeaders = new Headers()
myHeaders.append("Accept", "application/json")
myHeaders.append("Content-Type", "application/json")
myHeaders.append("Authorization", "Bearer " + localStorage.getItem("bearer"))

const store = createStore({
  state: {
    thermometers: [],
    kitchen_light1: [],
    living_room: [],
    living_room2: [],
    television: [],
    bedroom_switch: [],
    bedroom_light1: [],
    air_conditioner: []
  },

  mutations: {
    mutate_thermometers(state, promesse){
      state.thermometers = promesse
    },
    mutate_kitchen_light1(state, promesse){
      state.kitchen_light1 = promesse
    },
    mutate_living_room(state, promesse){
      state.living_room = promesse
    },
    mutate_living_room2(state, promesse){
      state.living_room2 = promesse
    }, 
    mutate_television(state, promesse){
      state.television = promesse
    }, 
    mutate_bedroom_switch1(state, promesse){
      state.bedroom_switch = promesse
    },
    mutate_bedroom_light1(state, promesse){
      state.bedroom_light1 = promesse
    },
    mutate_air_conditioner(state, promesse){
      state.air_conditioner = promesse
    }
  },
  actions: {
    async Thermometer(context, vartype) {
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_thermometers", promesse)
      })
    },
    async Kitchen_light1(context, vartype){
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_kitchen_light1", promesse)
      })
    }, 
    async LivingRoom(context, vartype){
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_living_room", promesse)})
    },
    async LivingRoom2(context, vartype){
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_living_room2", promesse)})
    }, 
    async television(context, vartype){
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_television", promesse)})
    },
    async bedroom_switch(context, vartype){
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_bedroom_switch1", promesse)})
    },
    async bedroom_light(context, vartype){
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_bedroom_light1", promesse)})
    },
    async air_conditioner(context, vartype){
      coreApi.glados.getEntities({ type: vartype }).then (promesse => {
        context.commit("mutate_air_conditioner", promesse)})
    },
    async Change_Attribute(context, message){ 
      console.log(message)
      // console.log("message.type lors de la methode change attribute " + message.type)
      
      var body_request = { type: message.z, }
      // body_request[type] = message.z
      body_request[message.y] = message.x 
      console.log(body_request)
      coreApi.glados.patchEntities(body_request).then (promesse => { 
        context.commit("mutate_thermometers", promesse)}) 
    },

    async texttospeech(context, store_choosen_state){

      console.log(context.state.thermometers[0])

      var obj = store_choosen_state

      const myJSON = JSON.stringify(obj)
      // new SpeechSynthesisUtterance object
      let utter = new SpeechSynthesisUtterance()
      utter.lang = "en-US"
      utter.text = myJSON
      utter.volume = 0.5

      // event after text has been spoken
      utter.onend = function () {
        alert("Speech has finished")
      }

      // speak
      window.speechSynthesis.speak(utter)
    }
  },
  modules: {},
})

export default store