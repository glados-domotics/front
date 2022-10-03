<template>
  <div>
    <div v-on:click="show_bedroom_switch"> Cliquez ici pour afficher les infos des types "switch"
      <br>
      <br>
      <span
        v-for="bedroom_switch in $store.state.bedroom_switch"
        :key="bedroom_switch.id">
        id : {{bedroom_switch.id}} <br>nom : {{bedroom_switch.name }} <br> type : {{bedroom_switch.type }} <br> status : {{bedroom_switch.status }} <br> valeur : {{bedroom_switch.value}} <br> crée le : {{bedroom_switch.created_at}}
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

      <p>Edit d'attribut : {{ message }}</p>
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


export default ({
  name: "bedroom_switch",
  setup() {
        
  },
  methods: {
    show_bedroom_switch(){
      this.$store.dispatch("bedroom_switch", "switch")
    },
    send_modification(){
      console.log("this.message lors du send modification : " + this.message)
      this.$store.dispatch("Change_Attribute", {
        x: this.message,
        y: this.event,
        z: "switch" 
      })
    },
    onChange(evenement){
      
      this.event = evenement.target.value
      console.log(evenement.target.value)
    },
    activatetexttospeech(){
      this.$store.dispatch("texttospeech", this.$store.state.bedroom_switch[0])
    }
  }, 
  data(){
    return {
      message: "", 
      event: null 
    }
  }
})
</script>
