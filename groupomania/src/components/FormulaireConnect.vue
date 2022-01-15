<template>
  <div class="card_form">
    <form @submit="postData" method="POST">
      <div class="form-row">
        <input type="email" name="email" placeholder="email" class="form_row_input" v-model="user.email"/>
      </div>
      <div class="form-row">
        <input type="password" name="password" placeholder="Mot de passe" class="form_row_input" v-model="user.password"/>
      </div>
      <div class="form-row">
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
.form-row {
  display: flex;
  margin: 16px 0px;
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
  flex: 1;
  min-width: 100px;
  color: black;
}
.button {
  background: #30475e;
  color: white;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
}
</style>