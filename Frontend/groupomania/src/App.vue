<template>
  <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>
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
}

#nav {
  display: flex;
  justify-content: center;
  padding: 30px;
  
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding-left:5px ;
  padding-right:5px ;
}

#nav a.router-link-exact-active {
  color: #f05454;
}
body{
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}

.profile{
  display: flex;
  justify-content: center;
}
.card{
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 116px;
  padding: 32px;
}
img{
  max-width: 100%;
  border-radius: 8px;
}
.card_title{
  text-align: center;
  font-weight: 800;
}
.card_subtitle{
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button{
  background: #2196F3;
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
