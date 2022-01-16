<template>
        <div id="Monprofil">
            <img src="profile_img.png">
            <h2 >Votre Prenom :<br></h2> 
            <h3>{{user.firstname}}</h3>
            <h2>Votre nom :<br></h2>
            <h3>{{user.username}}</h3>
            <h2>Votre email :<br></h2>
            <h3>{{user.email}}</h3>
            <div class="card_button">
                <button  class="button" @click="switchSocialPage()">Acceder au reseau social Groupomania</button>
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
                     firstname:null,
                     email: null,
                     
                },    
            }
    },
    mounted () {
    axios.get('http://localhost:3000/api/user/myprofil', {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
    }
    })
    .then(response => this.user = response.data)
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
          this.$router.push('/inscription')
          
        })
        .catch(error => console.log(error));
        },

        modifyPass: function(){
            this.$store.commit('UpdateProfil')
            this.$router.push('/updateProfil')
        },
        switchSocialPage: function(){
          this.$router.push('/reseauSocial')
        }
    },
    
}

</script>

<style scoped>
.card_button{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.styleProfil{
  color:#30475e;
}
h3{
  color:#f05454;
}
h2{
  color:white;
}
#Monprofil{
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
    
}
.avatar_profil{
    width: 3rem;
    height: 3rem;
    border-radius: 100% ;
}
.button{
  background: #f05454;
  color: #30475e;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width:150px;
  margin-bottom: 10px;
  padding:10px;
  transition: .4s background-color;
  display: flex;
  flex-direction: columns;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  font-size: 12px;
  height: 50px;
}
.button:hover{
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
    transform: scale(0.9, 1.1);
}
</style>