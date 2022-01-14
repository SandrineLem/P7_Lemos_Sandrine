<template>

  <div id="nav">
    <img src="./assets/icon-left-font-monochrome-black.png">
    <router-link to="/">Se connecter</router-link> |
    <router-link to="/inscription">Inscription</router-link> |
    <router-link to="/">Se deconnecter</router-link> |
    <router-link to="/myprofil">Mon profil</router-link>
  </div>
  <router-view/>
</template>

<style>
img{
  max-width: 15%;
  border-radius: 8px;
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
