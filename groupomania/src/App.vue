<template>

  <div id="nav">
    <img src="./assets/icon-left-font-monochrome-black.png" alt="Logo Entreprise">
      <div v-if="mode =='login'" >
        <router-link to="/">Se connecter</router-link> |
      </div>
      <div v-if="mode =='login'">
        <router-link to="/inscription">Inscription</router-link> |
      </div>  
      <div v-if="mode =='connect'">
        <router-link to="/myprofil">Mon profil</router-link> |
      </div> 
      <div v-if="mode =='connect'">
        <button class="button" @click="decoUser()">Se deconnecter</button> 
      </div>
        
        
  </div>
  <router-view/>
</template>
<script>

import Monprofil from'./components/MonProfil'
import Formulaire from'./components/Formulaire'
import FormulaireConnect from'./components/FormulaireConnect'
import FormulaireModifyProfil from'./components/FormulaireModifyProfil'
export default {
  name: 'App',
  data: function(){
    return {
      mode:null,
    }
  },
  mounted(){
    if(localStorage.getItem("token") == null){
      this.mode = "login"
      this.$router.push('/') 
    }else{
      this.mode = "connect"
      this.$router.push("/myprofil")
    }
  },
  methods:{
    decoUser : function(){
      localStorage.removeItem("token")
      this.$router.go('/')
    }
  }
    
      
}
</script>


<style>
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
img{
  max-width: 15%;
  border-radius: 8px;
  height: 180px
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #30475e;
}

#nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #30475e;
}
#nav a:hover{
  color: #f05454;
}

#nav a.router-link-exact-active {
  color: #f05454;
}





</style>
