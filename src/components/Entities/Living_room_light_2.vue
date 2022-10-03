<template>
  <div>
    <div v-on:click="show_living_room2"> Cliquez ici pour afficher les infos des types "lights"
      <br>
      <br>
      <span
        v-for="living_room2 in $store.state.living_room2"
        :key="living_room2.id">
        id : {{living_room2.id}} <br>nom : {{living_room2.name }} <br> type : {{living_room2.type }} <br> status : {{living_room2.status }} <br> valeur : {{living_room2.value}} <br> crée le : {{living_room2.created_at}}
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
  name: "Living_Room2",
  methods: {
    show_living_room2(){
      this.$store.dispatch("LivingRoom2", "light")
    },
    send_modification(){
      console.log("this.message lors du send modification : " + this.message)
      this.$store.dispatch("Change_Attribute", {
        x: this.message,
        y: this.event,
        z: "light" 
      })
    },
    onChange(evenement){
      
      this.event = evenement.target.value
      console.log(evenement.target.value)
    },
    activatetexttospeech(){
      this.$store.dispatch("texttospeech", this.$store.state.living_room2[0])
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