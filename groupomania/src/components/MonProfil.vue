<template>
    <div class="monprofil">
        <img src="/src/assets/profile_img.png">
        <p>Votre nom:<br></p>
        <p>Votre email:<br></p>
        <div >
            <button class="button">Acceder au reseau Social Groupomania</button>
            <button class="button">Modifier mon mot de passe</button>
            <button class="button">Supprimer mon mon compte</button>
        </div>
        
    </div>
</template>

<script>
// import Vue from 'vue'   // in Vue 2
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
    
    methods:{
        modifyPass: function(){
            this.$store.commit('UpdateProfil')
            this.$router.push('/updateProfil')
        }
    },
}
</script>

<style scoped>
.monprofil{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatar_profil{
    width: 3rem;
    height: 3rem;
    border-radius: 100% ;
}
.button{
  background: #30475e;
  color: white;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width: 100%;
  margin-bottom: 10px;
  padding: 16px;
  transition: .4s background-color;
  display: flex;
  flex-direction: columns;
  justify-content: center;
}
.button:hover{
  cursor: pointer;
  background: #1976d2;
}
</style>