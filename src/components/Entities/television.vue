<template>

  <div>
    <div v-on:click="show_television"> Cliquez ici pour afficher les infos du type "multimedia"

      <br>
      <br>
      <span
        v-for="television in $store.state.television"
        :key="television.id">
        id : {{television.id}} <br> nom : {{television.name }} <br> type : {{television.type }} <br> status : {{television.status }} <br> valeur : {{television.value}} <br> crée le : {{television.created_at}}
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

export default({
  name: "television",
  setup() {
        
  },
  methods: {
    show_television(){
      this.$store.dispatch("television", "multimedia")
    },
    send_modification(){
      console.log("this.message lors du send modification : " + this.message)
      this.$store.dispatch("Change_Attribute", {
        x: this.message,
        y: this.event,
        z: "multimedia" 
      })
    },
    onChange(evenement){
      
      this.event = evenement.target.value
      console.log(evenement.target.value)
    },
    activatetexttospeech(){
      this.$store.dispatch("texttospeech", this.$store.state.television[0])
    }
  }, 
  data(){
    return {
      message: "", 
      event: null 
    }
  }
}
)
</script>

