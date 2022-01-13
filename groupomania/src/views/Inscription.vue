<template>
        <div class="inscription">
          <h1>Pour creer un compte et acceder au reseau social de Groupomania</h1>
          <p>Veuillez remplir le formulaire</p>
          <Formulaire />
    
  </div>
</template>

<script>
  
import Formulaire from '../components/Formulaire.vue'

  export default {
  name: 'Inscription',
  components: {
    Formulaire
  }
 }
</script>