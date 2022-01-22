<template>
    <div class="card_form">
        <p class="errorsForm" v-if="user.error.length"></p>
        <b class="errorsForm" v-if="user.error.length">Veuillez corriger les erreurs suivantes :</b>
        <ul>
        <li class="errorsForm" v-for="e in user.error" v-bind:key="e.id">
        {{e}}
        </li>
        </ul>
        <form @submit="postData" method="POST" class="flex-box">
            <div class="form-row">
                <label for="username">Nom :</label>
                <input type="text" placeholder="Nom" id="username" class="form_row_input" name="username" v-model="user.username"/>
            </div>
                <p class="verif-connect" v-if="user.username == null">Veuillez renseigner votre nom<br>( Attention les chiffres et les symboles sont non autorisés )</p>
            <div class="form-row">
                <label for="firstname">Prenom :</label>
                <input type="text" placeholder="Prenom" id="firstname" class="form_row_input" name="firstname" v-model="user.firstname"/>
            </div>
                <p class="verif-connect" v-if="user.firstname == null">Veuillez renseigner votre prenom<br>( Attention les chiffres et les symboles sont non autorisés )</p>
            <div class="form-row">
                <label for="email">Email :</label>
                <input type="email" placeholder="email" id="email" class="form_row_input" name="email" v-model="user.email"/>
            </div>
            <p class="verif-connect" v-if="user.email == null">Veuillez renseigner votre email<br>( exemple@exemple.fr/com )</p>
            <div class="form-row">
                <label for="password">Mot de passe :</label>
                <input type="password" placeholder="Mot de passe" id="password" class="form_row_input" name="password" v-model="user.password"/>
            </div>
            <p class="verif-connect" v-if="user.password == null">Veuillez renseigner votre mot de passe<br>( 8 caractères min 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial )</p>
            <div class="form-row_conect"> 
            <button type="submit" class="button" value="submit">Créer mon compte</button> 
            </div>
        </form>
    </div>
</template>

<script>
// import Vue from 'vue'   // in Vue 2
import * as Vue from "vue"; // in Vue 3
import axios from 'axios';
import VueAxios from 'vue-axios';
import Accueil from "../views/Accueil";
    export default {
        data(){
            return {
                user:{
                    username: null,
                    firstname: null,
                    email: null,
                    password: null,
                    error:[],
                },
            };
        },
        methods:{
            postData(e) {
                e.preventDefault();
                console.warn(this.user);
                axios.post("http://localhost:3000/api/user/signup", this.user)
                .then((result) => {
                    console.warn(result);
                    localStorage.setItem("token", result.data.token);
                    this.$router.push('/')
                    console.log(this.user)
                    alert("Votre compte à été créé avec succès, vous allez être redirigé(e) sur la page de connexion !")
                    if (this.user.username, this.user.firstname, this.user.email && this.user.password) {
                    return true;
                    alert("Votre compte à été créé avec succès, vous allez être redirigé(e) sur la page de connexion !")
                    this.error=[];
                    }          
                })
                .catch((error) =>{
                    if(!this.user.username){
                        this.user.error.push("Oups votre Nom est invalide !")
                    }if(!this.user.firstname){
                        this.user.error.push("Oups votre Prenom est invalide !")
                    }if(!this.user.email){
                        this.user.error.push("Oups votre Email est invalide !")
                    }if(!this.user.password){
                        this.user.error.push("Oups votre Mot de passe est invalide !")
                    }
                    console.warn('errors', this.user.error)
                     alert("Veuillez verifier si vous n'avez pas déjà un compte ou que les champs soient tous correctement saisie !"); 
                })
                 
            }
        }, 
    };
</script>

<style scoped>
.errorsForm{
  color: #f05454;
  font-weight: bold;
}
.verif-connect{
  font-size: small;
  color: white;
}
.flex-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.card_form{
  align-items: center;
  display: flex;
  flex-direction: column;
}
.form-row{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
label{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
    color:white;
    margin-bottom: 5px;
}
.form-row_conect{
  display: flex;
  
  flex-wrap: wrap;
}
.form_row_input{
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex:1;
  min-width: 100px;
  color: black;
}
.button{
  background: #f05454;
  color: #30475e;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width:130px;
  margin-bottom: 10px;
  padding:10px;
  transition: .4s background-color;
  display: flex;
  flex-direction: columns;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  font-size: 12px;
  height: 50px;
  margin-right: 30px;
  margin-top: 20px;
}

.button:hover{
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
  transform: scale(0.9, 1.1);
}



</style>
