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

<style scoped>
.inscription{
  background-color:#30475e;
  border-radius:7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0,0,0,0.44); 
  box-shadow: 9px 8px 21px 1px rgba(0,0,0,0.44);
}
h1{
  padding-top:10px;
  color:#f05454;
}
p{
  color: white;
}

</style>