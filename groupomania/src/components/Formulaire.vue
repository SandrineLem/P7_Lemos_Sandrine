<template>
    <div class="card_form">
        <form @submit="postData" method="POST">
            <div class="form-row">
                <input type="text" placeholder="Nom" class="form_row_input" name="username" v-model="user.username"/>
            </div>
            <div class="form-row">
                <input type="text" placeholder="Prenom" class="form_row_input" name="firstname" v-model="user.firstname"/>
            </div>
            <div class="form-row">
                <input type="email" placeholder="email" class="form_row_input" name="email" v-model="user.email"/>
            </div>
            <div class="form-row">
                <input type="password" placeholder="Mot de passe" class="form_row_input" name="password" v-model="user.password"/>
            </div>
            <div class="form-row_conect"> 
            <button type="submit" class="button">Créer mon compte</button> 
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
                    password: null
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
                    alert("Votre compte à été créé avec succès, vous allez être redirigé(e) sur la page de connexion !")
                    this.$router.push('/')
                    console.log(this.user)
                })
                alert("Vous avez déjà un compte !");
                
            }
        },
        
    }
</script>

<style scoped>

.card_form{
  align-items: center;
  display: flex;
  flex-direction: column;
}
.form-row{
    display: flex;
    margin: 16px 0px;
    gap: 16px;
    flex-wrap: wrap;
}
.form-row_conect{
  display: flex;
  margin: 16px 0px 16px 16px;
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
  width:150px;
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
}

.button:hover{
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
    transform: scale(0.9, 1.1);
}



</style>
