<template>
    <div id="content_message">
        
        
            <div v-for="message in messages" class="flex_collum">
                <div class="ReseauSocial" >
                    <p class="card_title">"Message de : </p>
                    <p>{{message.titlte}}</p>
                    <p>{{message.content}}</p>
                    <img v-bind:src="message.attachment" alt="" v-if="message.attachment != null"/>
                    <div class="form-row_conect">
                        <button v-if="mode == 'authOk'" @click="putData(e)" class="button_message">modifier</button>
                        <button v-if="mode == 'authOk'" @click="deleteMessage()" class="button_message">supprimer</button>
                        <button  class="button_message">liker</button>
                    </div>
                    <div v-if="mode == 'authOk'"  class="card_modify-message">
                        <h5>Modifier votre message</h5>
                        <form @submit="putData" method="PUT" @submit.prevent="onUpload" >
                            <input type="text" placeholder="Nouveau Titre" class="form_row_input" name="titlte" v-model="message.titlte"/>
                            <input type="file" name="attachment" @change="onChange">
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
            messages: [],
            message: [],
            mode: null,
        }
        
    },
    mounted () {
        axios.get('http://localhost:3000/api/message/',{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
        }
        
        })
            .then((result) => { this.messages = result.data
            console.log(result.data)
            
            let token = localStorage.getItem("token");
            let decoded = VueJwtDecode.decode(token);
            console.log(decoded);
            let userIdMessage = message.lenght.userId;
            console.log(userIdMessage);

            let userIdUser = decoded.userId;
            console.log(userIdUser);


            if(userIdUser == userIdMessage){
                this.mode = "authOk"
            }else{
                this.mode="authNo"
            }
        })
    },
    
    methods: {
        deleteMessage(){
            let decoded = VueJwtDecode.decode(token);
            console.log(token)
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
        onChange(event) {
            this.attachment = event.target.files[0]
        },
        onUpload() {
            const formData = new FormData()
            formData.append('attachment', this.attachment, this.attachment.name)
            axios.post("http://localhost:3000/api/multi-images-upload", this.message, formData, {
            })
            .then((response) => {
                console.log(response)
            })
        },
        putData(e){
            
            e.preventDefault();
            console.log(this.message);
            const formData = new FormData()
            formData.append('attachment', this.attachment, this.attachment.name)
            axios.put('http://localhost:3000/api/message/:id', this.message, formData, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")//the token is a variable which holds the token
                },
            
            
            })
            .then((result)=> {

                this.$router.go('/reseauSocial')
                console.log(result);
                
                alert("Votre message à été modifié avec succès !");
                
                
            })    
        },
        modifyOk : function (){
            localStorage.getItem("token")
            
        },
        
    },
    

}
</script>

<style scoped>
h5{
    color: #f05454;
}
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
.form_row_input{
    border-radius: 8px;
    background: #f2f2f2;
    min-width: 150px;
    min-height: 20px;
    border: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    position: absolute;
    
}
.form_row_input:focus{
    background-color: #d8d8d8;
    
    
}

.form_row-textarea{
    border-radius: 8px;
    float: left;
    min-width: 90%;
    min-height: 75px;
    outline: none;
    resize: none;
    border: 1px solid grey;
    border: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin-bottom:10px;
    margin-top:10px;
}
.form_row-textarea:focus{
    background-color: #d8d8d8;
    border: solid 2px #3366FF;
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
.card_modify-message{
    margin-top: 20px;
    -webkit-box-shadow: 5px 5px 15px 5px #000000; 
    box-shadow: 5px 5px 15px 5px #000000;
    width: 88%;
    border-radius:25px;
    position: relative;
    padding-bottom: 20px;
}
#content_message{
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
}
</style>