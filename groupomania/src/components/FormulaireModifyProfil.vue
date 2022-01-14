<template>
<div class="modifyPass">
    <form @submit="getData" method="PUT">
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
                <input type="password" placeholder="Mot de passe actuel" class="form_row_input" name="password" v-model="user.password"/>
            </div>
            <div class="form-row">
                <input type="password" placeholder="Nouveau Mot de passe" class="form_row_input" name="newPassword" v-model="user.newPassword"/>
            </div>
            <div class="form-row">
                <button class="button" type="submit" >Modifier votre mot de passe</button>
                <button  class="button" @click="myProfil()">Annuler revenir à mon profil</button>
            </div>    
        </form>
</div>
</template>

<script>
// import Vue from 'vue'   // in Vue 2
import * as Vue from 'vue'; // in Vue 3
import axios from 'axios';
import VueAxios from 'vue-axios';
import MyProfil from "../views/Myprofil"; 

    export default {
    methods:{
        myProfil: function(){
            this.$store.commit('Myprofil')
            this.$router.push('/myprofil')
        }
    },
    data(){
        return {
            user:{
                username: null,
                firstname: null,
                email: null,
                password: null,
                newPassword: null
            },
        };
    },
    methods:{
        putData(e){
            e.preventDefault();
            console.log(this.user);
            axios.put("http://localhost:3000/api/user/updateProfil", this.user)
            .then((result)=> {
                console.warn(result);
                localStorage.setItem("token", result.data.token);
                alert("Votre mot de passe à été modifié avec succès !");
                console.log(this.user)
            })    
        }
    }
}

</script>

<style scoped>
.modifyPass{
    align-items: center;
    display: flex;
    flex-direction: column;
}
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
  background: #30475e;
  color: white;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: .4s background-color;
}
.button:hover{
  cursor: pointer;
  background: #1976d2;
}
</style>