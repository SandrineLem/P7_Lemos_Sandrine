<template>
        <div id="Monprofil">
            <img src="/src/assets/profile_img.png">
            <p>Votre Prenom {{user.firsname}}<br></p>
            <p>Votre nom: {{user.username}}<br></p>
            <p>Votre email:{{user.email}}<br></p>
            <div >
                <button class="button">Acceder au reseau Social Groupomania</button>
                <button  class="button" @click="modifyPass()">Modifier mon mot de passe</button>
                <button  class="button" @click="deletUser()">Supprimer mon mon compte</button>
            </div>
        </div>
</template>

<script>
// import Vue from 'vue'   // in Vue 2
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
    el:'Monprofil',
    data(){
        return {
                user:{
                     username: null,
                     firsname:null,
                     email: null,
                     password: null
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

     methods:{
        deletUser(){
            alert(" Votre compte à bien été supprimé ! ");
            axios.delete("http://localhost:3000/api/user/deleteProfil", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          localStorage.clear(); 
        })
        .catch(error => console.log(error));
        },

        modifyPass: function(){
            this.$store.commit('UpdateProfil')
            this.$router.push('/updateProfil')
        }
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