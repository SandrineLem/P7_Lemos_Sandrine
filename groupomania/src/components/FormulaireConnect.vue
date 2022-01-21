<template>
  <div class="card_form">
    <p class="errorsForm" v-if="user.error.length"></p>
      <b class="errorsForm" v-if="user.error.length">Veuillez corriger les erreurs suivantes :</b>
      <ul>
      <li class="errorsForm" v-for="e in user.error" v-bind:key="e.id">
      {{e}}
      </li>
      </ul>
    <form @submit="postData" method="POST">
      <div class="form-row">
        <label for="email">Email :</label>
        <input type="email" name="email" placeholder="email" class="form_row_input" v-model="user.email"/>
      </div>
      <p class="verif-connect" v-if="user.email == null">( Doit contenir les caractères "@" " . " /<br> exemple@exemple.com/fr/net )</p>
      <div class="form-row">
      <label for="password">Mot de passe :</label>
        <input type="password" name="password" placeholder="Mot de passe" class="form_row_input" v-model="user.password"/>
      </div>
      <p class="verif-connect" v-if="user.password == null">( Doit contenir 8 caractères min 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial )</p>
      <div class="form-row_conect">
        <button type="submit" class="button">Se connecter</button>
      </div>
      
    </form>
  </div>
</template>

<script>
// import Vue from 'vue'   // in Vue 2
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";
import MyProfil from "../views/Myprofil";
//Vue.use(VueAxios, axios);
export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
        error:[],
      },
    };
  },
  methods: {
    postData(e) {
      e.preventDefault();
      console.warn(this.user);
      axios.post("http://localhost:3000/api/user/login", this.user)
        .then((result) => {
          console.warn(result);
          localStorage.setItem("token", result.data.token);
          this.$router.go('/myprofil')
          alert(" Bienvenue vous allez être redirigé(e) sur votre profil");
          if (this.user.email && this.user.password) {
            return true;
            alert(" Bienvenue vous allez être redirigé(e) sur votre profil");
            this.error=[];
          }          
        })
        .catch((error) => {
          if(!this.user.email){
            this.user.error.push("Email invalide !");
          }if(!this.user.passaword){
            this.user.error.push('Mot de passe invalide !'); 
          }
          console.warn('errors',this.user.error)
        });  
    },
  },
};
</script>

<style scoped>
.verif-connect{
  font-size: small;
  color: white;
}
.errorsForm{
  color: #f05454;
  font-weight: bold;
}
form{
  display:flex;
  flex-direction: column;
  align-items:center;
}
label{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
    color:white;
    margin-bottom: 5px;
    margin-top: 5px;
}
.card_form {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.form-row_conect{
  display: flex;
  margin: 16px 0px 16px 30px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
.form_row_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  min-width: 100px;
}
.button {
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
  margin-right: 40px;
}
.button:hover {
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
    transform: scale(0.9, 1.1);
}
</style>