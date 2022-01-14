<template>
        <div id="Monprofil">
            <img src="/src/assets/profile_img.png">
            <p>Votre nom: {{user.username}}<br></p>
            <p>Votre email:{{user.email}}<br></p>
            <div >
                <button class="button">Acceder au reseau Social Groupomania</button>
                <button @click="modifyPass()" class="button">Modifier mon mot de passe</button>
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
    el:'Monprofil',
    data(){
        return {
                user:{
                     userId: 6
                },
                
            }
    },
    mounted () {

        axios.get('http://localhost:3000/api/user/myprofil', this.user, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
    }
    })
    .then(response => console.warm(response))
    },
}
</script>

<style scoped>
#Monprofil{
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