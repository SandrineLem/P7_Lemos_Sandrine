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

<style scoped>
.myprofil{
  background-color:#30475e;
  border-radius:7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0,0,0,0.44); 
  box-shadow: 9px 8px 21px 1px rgba(0,0,0,0.44);
}
h1{
  color:#f05454;
}

</style>
