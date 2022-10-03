<template>
  <div>
    <div v-on:click="show_thermometer"> Cliquez pour afficher les infos du type "sensor"
      <br>
      <br>
      <span
        v-for="thermometer in $store.state.thermometers"
        :key="thermometer.id">
        id : {{ thermometer.id}} <br> nom : {{thermometer.name }} <br> type : {{thermometer.type }} <br> status :{{thermometer.status }} <br> valeur : {{thermometer.value}} <br> créé le : {{thermometer.created_at}}
      </span>
    </div>

    <br>
    <br>

    <label for="pet-select">Choisissez un attribut : </label>

    <select
      name="attributes"
      @change="onChange($event)"
      id="attributes-select" >
      <option value="">--Veuillez choisir un attribut--</option>
      <option value="name">nom</option>
      <option value="type">type</option>
      <option value="status">status</option>
      <option value="value">valeur</option>
      <option value="created_at">Crée le : </option>
    </select>

    <form
      @submit="onSubmit"
      class="add-form">

      <p>edit d'attribut : {{ message }}</p>
      <input v-model="message"/>

      <p>
        <input
          type="submit"
          value="Envoyer le formulaire"
          @click.prevent="send_modification">

      </p>
    </form>

    <br>
    <br>

    <div v-on:click="activatetexttospeech"> appuyer pour activer le text to speech
    </div> 
  </div>
  
</template>


<script>

export default({
  name: "Thermometer",
  methods: {
    show_thermometer(){
      this.$store.dispatch("Thermometer", "sensor")
    },
    send_modification(){
      console.log("this.message lors du send modification : " + this.message)
      this.$store.dispatch("Change_Attribute", {
        x: this.message,
        y: this.event,
        z: "sensor" 
      })
    },
    onChange(evenement){
      
      this.event = evenement.target.value
      console.log(evenement.target.value)
    },
    activatetexttospeech(){
      this.$store.dispatch("texttospeech", this.$store.state.thermometers[0])
    }
  }, 
  data(){
    return {
      message: "", 
      event: null,
    }
  }
  
})


</script>

<style scoped>
input {
  margin-left: 10px;
}
</style>