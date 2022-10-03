<template>
  <div>
    <div v-on:click="show_air_conditioner"> Cliquez ici pour afficher les infos du type "air climatiseur"
      <br>
      <br>
      <span
        v-for="air_conditioner in $store.state.air_conditioner"
        :key="air_conditioner.id">
        id : {{air_conditioner.id}} <br> nom : {{air_conditioner.name }} <br> type : {{air_conditioner.type }} <br> status : {{air_conditioner.status }} <br> valeur : {{air_conditioner.value}} <br> créé le : {{air_conditioner.created_at}}
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
  name: "air_conditioner",
  setup() {
        
  },
  methods: {
    show_air_conditioner(){
      this.$store.dispatch("air_conditioner", "air_conditioner")
    },
    send_modification(){
      console.log("this.message lors du send modification : " + this.message)
      this.$store.dispatch("Change_Attribute", {
        x: this.message,
        y: this.event,
        z: "air_conditioner" 
      })
    },
    onChange(evenement){
      
      this.event = evenement.target.value
      console.log(evenement.target.value)
    },
    activatetexttospeech(){
      this.$store.dispatch("texttospeech", this.$store.state.air_conditioner[0])
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
