<template>
  <div class="accueil">
    <Formulaire />
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Formulaire from '@/components/Formulaire.vue'

export default {
  name: 'Accueil',
  components: {
    HelloWorld,
    Formulaire
  }
}
</script>
<style scoped>
.accueil{
  display: flex;
  justify-content: center;
}
</style>

