<template>
  <div id="nav">
    <img src="./assets/icon-left-font-monochrome-black.png">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/profile">Mon profil</router-link> |
    <router-link to="/">Se deconnecter</router-link>  
  </div>
  <router-view/>
</template>

<script>


</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
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
  color: #222831;
  padding-left:5px ;
  padding-right:5px ;
}

#nav a.router-link-exact-active {
  color: #222831;
}


body{
  background-image: linear-gradient(62deg, #f05454 0%, #f05454 100%);
}

.profile{
  display: flex;
  justify-content: center;
}
.card{
  max-width: 100%;
  width: 540px;
  background-position: center;
  background-image: url("./assets/icon_small.png");
  border-radius: 116px;
  padding: 32px;
  margin-bottom: 10px;
}
img{
  max-width: 25%;
  border-radius: 8px;
}
.card_title{
  text-align: center;
  font-weight: 800;
}
.card_subtitle{
  text-align: center;
  color: #222831;
  font-weight: 500;
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
.card_action{
  color:#2196F3;
  text-decoration: underline;
}
.card_action:hover{
  cursor: pointer;
}
.button:hover{
  cursor: pointer;
  background: #1976d2;
}
.button--disabled{
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover{
  cursor:not-allowed;
  background: #cecece;
}

</style>
