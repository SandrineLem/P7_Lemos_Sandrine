<template>
    <div id="OnePageMessage">
            
            <div class="content_message">
                <h1>Votre message</h1>
                <p class="card_title">"Message de : </p>
                <p>{{message.titlte}}</p>
                <p>{{message.content}}</p>    
                <img v-bind:src="message.attachment" alt=""/>
            </div>   
    </div>


</template>



<script>

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJwtDecode from "vue-jwt-decode";
import SocialPage from '../views/SocialPage'
export default {
    name:'OnePageMessage',
    data () {
        return {
            message:{
                titlte: null,
                content: null,
                attachment: null,
                likes: null,
                isAdmin: null,
            }
        }
    },
    mounted () {
        axios.get('http://localhost:3000/api/message/:id', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
        }  
        })
        .then(response => this.message = response.data)
    },
    


}


</script>

<style scoped>
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
    margin-bottom:20px;
    -webkit-box-shadow: 5px 5px 15px 5px #000000; 
    box-shadow: 5px 5px 15px 5px #000000;
    overflow: scroll;
    height: 600px;
    padding-left:10px;
    padding-right:10px;
     background-color:#30475e;
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

</style>