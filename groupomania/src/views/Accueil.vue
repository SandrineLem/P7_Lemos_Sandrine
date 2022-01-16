<template>
  <div class="Accueil">
    <h1>Bienvenue sur le reseau social de Groupomania </h1>
    <p>Pour vous connecter veuillez remplir ce formulaire</p> 
    <FormulaireConnect />
  </div>
</template>

<script>
// @ is an alias to /src

import FormulaireConnect from '@/components/FormulaireConnect.vue'

export default {
  name: 'accueil',
  components: {
     FormulaireConnect
  },
  
}
</script>

<style scoped>
.Accueil{
  background-color:#30475e;
  border-radius:7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0,0,0,0.44); 
  box-shadow: 9px 8px 21px 1px rgba(0,0,0,0.44);
}
h1{
  color:#f05454;
}
p{
  color: white;
}
</style>
