<template>
    <div id="content_message">
        
        
            <div v-for="message in messages" class="flex_collum">
                <div class="ReseauSocial" >
                    <p class="card_title">"Message de : </p>
                    <p>{{message.titlte}}</p>
                    <p>{{message.content}}</p>
                
                    <div class="form-row_conect">
                        <button class="button_message">modifier</button>
                        <button @click="deleteMessage()" class="button_message">supprimer</button>
                        <button class="button_message">liker</button>
                    </div>
                    <div class="card_modify-message">
                        <h5>Modifier votre message</h5>
                        <form @submit="putData" method="PUT">
                            <input type="text" placeholder="Nouveau Titre" class="form_row_input" name="titlte" v-model="message.titlte"/>
                            <textarea class="form_row-textarea" name="content"
                            row="4" cols="25" v-model="message.content">
                            </textarea>
                            <button class="button_message" type="submit">Envoyer</button>
                        </form>
                    
                    
                    </div>
                </div>
            </div>
       
    </div>      
</template>



<script>
// import Vue from 'vue'   // in Vue 2
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import SocialPage from '../views/SocialPage'
import VueJwtDecode from "vue-jwt-decode";
export default {
    el:'content_message',
    data (){
        return {
            messages: []
        }
        
    },
    mounted () {
        
        axios.get('http://localhost:3000/api/message/',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
        }
        })
            .then(result => this.messages = result.data)   
    },
    methods: {
        deleteMessage(){
            
            axios.delete("http://localhost:3000/api/message/:id", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(() => {
                this.$router.go('/reseauSocial')
                alert("Votre message à bien été supprimé !")   
            })
            .catch(error => console.log(error));
        },
        putData(e){
            e.preventDefault();
            console.log(this.user);
            axios.put('http://localhost:3000/api/message/:id', this.message, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
                }
            })
            .then((result)=> {
                console.warn(result);
                
                alert("Votre message à été modifié avec succès !");
                
                
            })    
        },
    }
    

}
</script>

<style scoped>
.flex_collum{
    display: flex;
    flex-direction: collumn;
    
}
.title_Actualite{
    color:#f05454;
}
.scroll_allMessage{
  resize: vertical;
  overflow: scroll;
  background-color:#30475e;
  border-radius:7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0,0,0,0.44); 
  box-shadow: 9px 8px 21px 1px rgba(0,0,0,0.44);
  width:400px;
  height:500px;
  display:flex;
  
  padding-top:30px;
  
}
.form-row_conect{
    display: flex;
    width:100%;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items:center;  
    margin-left: 80px;
}
.ReseauSocial{
  padding-bottom: 30px;
  margin-top: 15px;
  background-color:#30475e;
  border-radius:7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0,0,0,0.44); 
  box-shadow: 9px 8px 21px 1px rgba(0,0,0,0.44);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  width:90%;
  resize: vertical;
  overflow: scroll;
  
}
.button_message{
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
.button_message:hover{
 color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
  transform: scale(0.9, 1.1); 
}
.card_title{
    color: #f05454;  
}
p{
  color: white;
}
#content_message{
    width:55%;
    border-radius:25px;
    border-color: #f05454;
    margin-bottom:20px;
    -webkit-box-shadow: 5px 5px 15px 5px #000000; 
    box-shadow: 5px 5px 15px 5px #000000;
    resize: vertical;
    overflow: scroll;
    height: 600px;
    padding-left:10px;
    padding-right:10px;
}
</style>