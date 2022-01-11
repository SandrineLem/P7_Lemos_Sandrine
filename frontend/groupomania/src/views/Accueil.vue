<template>
  <div class="accueil">
  <Formulaire />
  </div>
  <footer>
    <Footer />
  </footer>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Formulaire from '@/components/Formulaire.vue'
import Footer from '../components/Footer.vue'


export default {
  name: 'Accueil',
  components: {
    HelloWorld,
    Formulaire,
    Footer
  }
}
</script>
<style scoped>
.accueil{
  display: flex;
  justify-content: center;
}
</style>

