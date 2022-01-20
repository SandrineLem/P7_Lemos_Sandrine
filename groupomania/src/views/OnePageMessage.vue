<template>
    
    <div id="OnePageMessage">
        <div>
        <button @click="switchReseauSocial()" class="button_message">Retour Reseau Social</button> 
        </div>  
        <div class="content_message">
            <p class="card_content">Message de : {{ message.userId}} </p>
            <p class="card_title">{{message.titlte}}</p>
            <img v-bind:src="message.attachment" alt="image envoyé d'un message par un utilisateur " v-if="message.attachment != null" class="img_message-One"/>
            <p class="card_content">{{message.content}}</p>        
        </div>  
    </div>
    
</template>



<script>
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJwtDecode from "vue-jwt-decode";
import SocialPage from '../views/SocialPage';

export default {
    name:'OnePageMessage',
    data () {
        return {
            message:{},
            attachment: null,
        }
    },
    mounted () {
        console.warn(this.$route.params.id)
        axios.get('http://localhost:3000/api/message/' + this.$route.params.id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
        }  
        })
        .then(response => {this.message = response.data; console.warn(this.message)});   
    },
    methods:{
        switchReseauSocial: function (){
            this.$router.push('/reseauSocial')
        }
    }
}
</script>

<style scoped>
.img_message-One{
   object-fit: cover;
   max-width: 90%;
    border-radius: 8px;
    max-height: 200px;
    width: 200px;
}
.button_message:hover{
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
  transform: scale(0.9, 1.1);
}
.button_message{
    margin-bottom:30px;
    background: #f05454;
    color: white;
    border-radius: 8px;
    font-weight: 15px;
    border: none;
    transition: .4s background-color;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
    font-size: 10px;
    height:30px;
    min-width: 75px;
}
.form_row_input{
    border-radius: 8px;
    background: #f2f2f2;
    min-width: 150px;
    min-height: 20px;
    border: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    position: absolute;
    
}
.card_title{
    color: #f05454;  
}
h1{
    color:#f05454;
}
.content_message{
    width:55%;
    border-radius:25px;
    border-color: #f05454;
    -webkit-box-shadow: 5px 5px 15px 5px #000000; 
    box-shadow: 5px 5px 15px 5px #000000;
    height: 600px;
    padding-left:10px;
    padding-right:10px;
    background-color:#30475e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#OnePageMessage{
  margin-top: 50px;
  padding-top: 40px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content:center;
  justify-content: center;
  width:98%;
  background-color:#30475e;
  border-radius:25px;
  border-color: #f05454;
  
}
.card_content{
    color: white;
}
</style>