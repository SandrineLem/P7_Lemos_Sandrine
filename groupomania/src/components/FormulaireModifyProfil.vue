<template>
<div id="modifyPass">
    <form @submit="putData" method="PUT">
            
            <div class="form-row">
                <input type="password" placeholder="Nouveau Mot de passe" class="form_row_input" name="newPassword" v-model="user.newPassword"/>
            </div>
        <div class="card_button">    
            <div class="form-row">
                <button class="button" type="submit" >Modifier votre mot de passe</button>
        </div>        
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
    name: 'modifyPass',
    methods:{
        myProfil: function(){
            this.$store.commit('Myprofil')
            this.$router.push('/myprofil')
        }
    },
    data(){
        return {
            user:{
                newPassword: null
            },
        };
    },
    methods:{
        putData(e){
            e.preventDefault();
            console.log(this.user);
            axios.put('http://localhost:3000/api/user/updateProfil', this.user, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
                }
            })
            .then((result)=> {
                console.warn(result);
                localStorage.removeItem("token");
                alert("Votre mot de passe à été modifié avec succès !");
                this.$router.push('/')
                
            })    
        }
    }
}

</script>

<style scoped>
#modifyPass{
    align-items: center;
    display: flex;
    flex-direction: column;
}
.card_button{
    display: flex;
  justify-content: center;
  flex-wrap: wrap;
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