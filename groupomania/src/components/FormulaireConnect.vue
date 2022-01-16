<template>
  <div class="card_form">
    <form @submit="postData" method="POST">
      <div class="form-row">
        <input type="email" name="email" placeholder="email" class="form_row_input" v-model="user.email"/>
      </div>
      <div class="form-row">
        <input type="password" name="password" placeholder="Mot de passe" class="form_row_input" v-model="user.password"/>
      </div>
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
          alert(" Bienvenue vous allez être redirigé sur votre profil");
        })
        .catch((error) => {
          alert(" Email ou mot de passe incorrect ! ");
        })
    },
  },
};
</script>

<style scoped>
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
  margin: 16px;
  gap: 16px;
  flex-wrap: wrap;
}
.form_row_input {
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
.button {
  background: #f05454;
  color: #30475e;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width:150px;
  
  padding:15px;
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
.button:hover {
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
    transform: scale(0.9, 1.1);
}
</style>