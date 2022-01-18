<template>
    <img src="./assets/icon-groupomania-ac.png" alt="Logo Entreprise">
  <div id="nav">
      <div v-if="mode =='login'" >
        <router-link to="/">Se connecter</router-link> 
      </div>
      <div v-if="mode =='login'">
        <router-link to="/inscription">Inscription</router-link> 
      </div>  
      <div v-if="mode =='connect'">
        <router-link to="/myprofil">Profil</router-link> 
      </div> 
      <div v-if="mode =='connect'">
        <button class="button_nav" @click="decoUser()">Se deconnecter</button> 
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
  },    
}
</script>


<style>

*{
  margin-left:10px;
  margin-right:10px;
}
.button :hover{
  cursor: pointer;
  background: #3498cb;
  transform: translate(0px,2px);
  -webkit-box-shadow: 9px -2px 16px -7px rgba(69,24,24,0.99); 
  box-shadow: 9px -2px 16px -7px rgba(69,24,24,0.99);
  transition: transform 0.8s 0s ease in out;
}
.button_nav{
  margin-left:5px;
  margin-top:9px;
  background: #30475e;
  color:#f05454;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width:100%;
  margin-bottom: 10px;
  padding: 16px;
  transition: .4s background-color;
  display: flex;
  flex-direction: columns;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  font-size: 16px;


}
.button_nav:hover{
  cursor: pointer;
  color: #3798cb; 
  transition: transform 200ms ease-in;
  transform: scale(0.9);
}

img{
  max-width: 40%;
  border-radius: 8px;
  height: 200px;
  width:200px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #30475e;
}

#nav {
  height: 73px;
  border-radius:8px;
  display: flex;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
  background-color:#30475e;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0,0,0,0.44); 
  box-shadow: 9px 8px 21px 1px rgba(0,0,0,0.44);
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #f05454;
  margin-right:25px;
  margin-left:25px;
}
#nav a:hover{
    color:#3498cb;
    transition: all 200ms ease-in;
    transform: scale(1.2);
}

#nav a.router-link-exact-active {
  color: #3798cb;
   border-bottom: 1px solid;
}





</style>
