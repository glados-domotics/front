<template>
  <div>
    <div v-on:click="show_kitchen_light1"> Cliquez ici pour afficher les infos des types "lights"
      <br>
      <br>
      <span
        v-for="kitchen_light1 in $store.state.kitchen_light1"
        :key="kitchen_light1.id">
        id : {{kitchen_light1.id}} <br> nom : {{kitchen_light1.name }} <br> type : {{kitchen_light1.type }} <br> status : {{kitchen_light1.status }} <br> valeur :{{kitchen_light1.value}} <br> crée le : {{kitchen_light1.created_at}}
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

      <br>
      <br>

    </form>
    <div v-on:click="activatetexttospeech"> appuyer pour activer le text to speech
    </div> 

  </div>

</template>


<script>
export default({
  name: "Kitchen_Light_1",
  methods: {
    show_kitchen_light1(){
      this.$store.dispatch("Kitchen_light1", "light")
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
      this.$store.dispatch("texttospeech", this.$store.state.kitchen_light1[0])
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
