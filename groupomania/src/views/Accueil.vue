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
