<template>
  <div
    class="absolute bottom-pane p-6"
    :class="{'on': selectedEntity}">

    <!-- {{ selectedEntity }} -->
    
    <div v-if="selectedEntity">
        
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row justify-start items-center text-gray-600">
          <svg
            class="status-button flex-initial mr-4"
            :class="selectedEntity.status"
            style="width:24px;height:24px"
            viewBox="-5 -5 34 34">
            <path
              fill="currentColor"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
          </svg>
          <svg
            class="flex-initial mr-4"
            v-if="selectedEntity.type === 'light'"
            style="width:24px;height:24px"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z" />
          </svg>
          <svg
            class="flex-initial mr-4"
            v-else-if="selectedEntity.type === 'sensor'"
            style="width:24px;height:24px"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6,3H3V6A3,3 0 0,0 6,3M14,3H12A9,9 0 0,1 3,12V14C9.08,14 14,9.07 14,3M10,3H8A5,5 0 0,1 3,8V10A7,7 0 0,0 10,3M10,21H12A9,9 0 0,1 21,12V10A11,11 0 0,0 10,21M18,21H21V18A3,3 0 0,0 18,21M14,21H16A5,5 0 0,1 21,16V14A7,7 0 0,0 14,21Z" />
          </svg>
          <svg
            class="flex-initial mr-4"
            v-else-if="selectedEntity.type === 'multimedia'"
            style="width:24px;height:24px"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9 13V5C9 3.9 9.9 3 11 3H20C21.1 3 22 3.9 22 5V11H18.57L17.29 9.26C17.23 9.17 17.11 9.17 17.05 9.26L15.06 12C15 12.06 14.88 12.07 14.82 12L13.39 10.25C13.33 10.18 13.22 10.18 13.16 10.25L11.05 12.91C10.97 13 11.04 13.15 11.16 13.15H17.5V15H11C9.89 15 9 14.11 9 13M6 22V21H4V22H2V2H4V3H6V2H8.39C7.54 2.74 7 3.8 7 5V13C7 15.21 8.79 17 11 17H15.7C14.67 17.83 14 19.08 14 20.5C14 21.03 14.11 21.53 14.28 22H6M4 7H6V5H4V7M4 11H6V9H4V11M4 15H6V13H4V15M6 19V17H4V19H6M23 13V15H21V20.5C21 21.88 19.88 23 18.5 23S16 21.88 16 20.5 17.12 18 18.5 18C18.86 18 19.19 18.07 19.5 18.21V13H23Z" />
          </svg>
          <svg
            class="flex-initial mr-4"
            v-else-if="selectedEntity.type === 'air_conditioner'"
            style="width:24px;height:24px"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z" />
          </svg>
          <div class="font-bold text-xl">{{ selectedEntity.name }}</div>
        </div>
        <div class="ml-5 text-gray-400 hidden md:block">{{ selectedEntity.id }}</div>
      </div>
      <div class="flex flex-row justify-between items-start">
        <button
          class="mt-4 border-2 rounded-md cursor-pointer p-3"
          @click="textToSpeech">
          <svg
            class="mr-2 inline"
            style="width:24px;height:24px"
            viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
          </svg> Lire le statut</button>
        <div class="text-right">
          <button
            class="mt-4 border-2 rounded-md cursor-pointer p-3"
            :class="{'border-orange-400': edit}"
            @click="editMode">
            <svg
              class="mr-2 inline"
              style="width:24px;height:24px"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            </svg> {{edit ? "Sauvegarder" : "Editer"}}</button>
          <div :class="{'invisible': !edit}">
            Statut : 
            <select
              class="mt-1"
              v-model="form.status">
              <option value="on">ON</option>
              <option value="off">OFF</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Use v-show instead of v-if to keep the node in cache, and not lose knob -->
      <div
        class="mt-8 w-full text-center"
        v-show="selectedEntity.value && entityParams.numeric">

        <div
          class="relative inline-block knob-ctn"
          :class="{'invisible': !entityParams.numeric, 'pointer-events-none': !this.edit}">
          <input
            type="text"
            value="20"
            class="dial" />
        </div>
        <p
          :class="{'on': edit}"
          class="tuto">Vous pouvez éditer ce bouton</p>

      </div>
      <div
        v-show="!entityParams.numeric"
        class="flex flex-row justify-center items-end mt-8 w-full">
        <div class="value">
          {{ selectedEntity.value }}
        </div>
        <div class="unit text-gray-500 font-bold ml-2">
          {{ entityParams.unit }}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ENTITY_PARAMS, readText } from "@/assets/constants"
import $ from "jquery"
// eslint-disable-next-line
import { knob } from "@/assets/knob"


export default {
  data(){
    return {
      edit: false,
      knobLoaded: false,
      form: {
        value: "",
        status: ""
      },
    }
  },
  async mounted(){
    // console.log(knob)
    this.initKnob()
  },
  methods: {
    textToSpeech(){
      let utter = new SpeechSynthesisUtterance()
      utter.lang = "en-US"
      const text = readText(this.selectedEntity.name, this.selectedEntity.status)
      utter.text = text
      utter.volume = 0.8
      utter.rate = 0.8

      // event after text has been spoken
      utter.onend = function () {
        // console.log("Speech has finished")
      }
      window.speechSynthesis.speak(utter)
    },
    initKnob(){
      if (!this.selectedEntity) return
      if (this.knobLoaded) return
      $(".dial").knob({
        label: this.selectedEntity?.type || "",
        value: this.selectedEntity?.value || 20,
        fgColor: "#00d6a3",
        angleOffset: -125,
        angleArc: 250,
        min: 10,
        max: 50,
        width: 200,
        className: "dial",
        lineCap: "round",
        displayInput: true,

        format: (v) => {
          if (Object.keys(ENTITY_PARAMS).includes(this.selectedEntity.type)){
            // return v 
            return ENTITY_PARAMS[this.selectedEntity.type].format(v)
          }
          return v
        },
        release: (v) => {
          this.form.value = v
        }
      })
      // $(".dial").val(this.selectedEntity.value).trigger("change")
      this.knobLoaded = true
    },
    editMode(){
      if (this.edit) this.saveEntity()
      this.edit = !this.edit
    },
    updateKnob(){
      if (!this.knobLoaded) {
        this.initKnob()
      }
      if (Object.keys(ENTITY_PARAMS).includes(this.selectedEntity.type)){
        var value = ENTITY_PARAMS[this.selectedEntity.type].format(this.selectedEntity.value)
        $(".dial").trigger(
          "configure", { ...ENTITY_PARAMS[this.selectedEntity.type] }
        )
        $(".dial").val(value).trigger("change")
      } else {
        console.log("NaN")
      }
    },
    saveEntity(){
      const form = {
        value: this.form.value,
        status: this.form.status,
      }
      this.$store.dispatch("saveEntity", {id: this.form.id, form })
        .then(() => {})   // the store resolve(res) the value of the XHR - just in case
        .catch((err) => {
          this.isError = true
          console.warn(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  watch: {
    selectedEntity(newVal){
      if (this.edit) this.edit = false
      this.form = {
        id: newVal.id,
        value: newVal.value,
        status: newVal.status
      }
      setTimeout(() => {  // required to let the DOM renders
        this.updateKnob()
      }, 60)
    }
  },
  computed: {
    entityParams(){
      if (Object.keys(ENTITY_PARAMS).includes(this.selectedEntity.type)) return ENTITY_PARAMS[this.selectedEntity.type]
      return { unit: "", numeric: false }
    },
    selectedEntity: {
      get(){
        return this.$store.state.selectedEntity
      },
      set(newVal){
        this.$store.commit("SET_SELECTED_ENTITY", newVal)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-pane{
    z-index: 21;
    bottom: 0;
    top: initial;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 30vh;
    background-color: #FFFFFF22;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    border-top: 1px solid #CCC;
    transform: translateY(100%);
    transition: transform .35s 0s ease-in-out;
    
    &.on{
        transform: translateY(0);
        transition: transform .35s .2s ease-in-out;
    }
}
.value{
    background-image: linear-gradient(45deg, rgb(68,255,205) 0%, rgb(0,214,163));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 80px;
    font-weight: 700;
}
.unit{
    transform: translateY(-27px);
    font-size: 2rem;
}
.dial{
  top: 0%;
  left: calc(100% - 22px);
  transform-origin: 50% 50%;
  transform: scale(.65);
  width: 150px !important;
}
.tuto{
  transform: translateY(100%);
  opacity: 0;
  transition: all .35s 0s ease-in-out;
  &.on{
    transform: translateY(0);
    opacity: 1;
    transition: all .35s .1s ease-in-out;
  }
}
</style>