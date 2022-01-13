<template>
    <div class="myprofil">
        <h1>Bienvenue sur votre profil</h1>
        <MonProfil />
    </div>
</template>

<script>
  
import MonProfil from '../components/MonProfil.vue'

  export default {
  name: 'Myprofil',
  components: {
    MonProfil
  }
 }
</script>
