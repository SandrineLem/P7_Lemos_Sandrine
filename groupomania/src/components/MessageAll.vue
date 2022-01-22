<template>
  <div id="content_message">
    <div v-for="message in messages" class="flex_collum">
      <div class="ReseauSocial">
        <p class="card_title">Message de : {{message.userId}}</p>
        <p>{{message.titlte}}</p>
        <p>{{message.content}}</p>
        <img v-bind:src="message.attachment" alt="image envoyé d'un message par un utilisateur "  v-if="message.attachment != null" />
        <div class="form-row_conect">
          <button @click="switchOneMessage(message.id)" class="button_message">Voir message</button>
          <button v-if="tokenUser.userId == message.userId" @click="AfficherFormulaire(message.id)"  class="button_message-modifier">modifier</button>
          <button v-if="tokenUser.userId == message.userId" @click="deleteMessage(message.id)" class="button_message">supprimer</button>
        </div>
        <div v-if="messageIdShow == message.id" class="card_modify-message" >
          <h5 class="card_title-modifier">Que voulez vous modifier ?</h5>
          <form class="form-row" @submit="putData" method="POST">
            <div>
              <label>Modifier le titre ?</label>
            </div>
            <div>
              <input type="text" placeholder="Nouveau Titre" class="form_row_input" name="titlte" v-model="newMessage.titlte"/><br />
            </div>
            <div>
              <label>Modifier votre photo ?</label>
            </div>
            <div>
              <input type="file" name="attachment" @change="onChange" class="input_file-message" /><br />
            </div>
            <div>
              <label for="content">Votre contenu ?</label>
            </div>
            <div>
              <textarea class="form_row-textarea" name="content" row="4" cols="25" v-model="newMessage.content"></textarea>
            </div>
            <div>
              <button class="button_message" type="submit">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// import Vue from 'vue'   // in Vue 2
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";
import SocialPage from "../views/SocialPage";
import VueJwtDecode from "vue-jwt-decode";
import OnePageMessage from "../views/OnePageMessage";

export default {
  el: "content_message",
  data() {
    return {
      messages: [],
      message: [],
      mode: null,
      tokenUser: {},
      newMessage: {
        titlte: null,
        content: null,
        attachment: null,
      },
      messageIdShow: null,
      userIsAdmin: false,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/message/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") //the token is a variable which holds the token
        }
      })
      .then(result => {
        this.messages = result.data;
        let token = localStorage.getItem("token");
        let decoded = VueJwtDecode.decode(token);
        this.tokenUser = decoded;
      });
  },

  methods: {
    AfficherFormulaire(messageId) {
      this.messageIdShow = messageId;
      
    },
    
    deleteMessage(messageId) {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      let userId= decoded.userId;
      let userIsAdmin = decoded.isAdmin;
      console.log(userIsAdmin)
    if(confirm("Etes vous sûre de vouloir supprimer ce message ?")){
        axios
        .delete("http://localhost:3000/api/message/" + messageId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          alert("Votre message à bien été supprimé !");
          this.$router.go("/reseauSocial");
        })
        .catch(error => console.log(error));
    }else{
        this.$router.go("/reseauSocial");
      }; 
    },
    onChange(event) {
      this.newMessage.attachment = event.target.files[0];
    },

    putData(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", this.newMessage.attachment);
      formData.append("titlte", this.newMessage.titlte);
      formData.append("content", this.newMessage.content);
      if(confirm("Etes vous sûre de vouloir modifier ce message ?")){
        axios
        .put(
          "http://localhost:3000/api/message/" + this.messageIdShow,
          formData,
          {
            "Content-Type": "multipart/form-data",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token") //the token is a variable which holds the token
            }
          }
        )
        .then(result => {
          console.warn(result);
          alert("Votre message à bien été envoyé !");
          this.$router.go("/reseauSocial");
        });
      }else{
        this.$router.go("/reseauSocial");
      }
    },
    modifyOk: function() {
      localStorage.getItem("token");
    },
    switchOneMessage: function(messageId) {
      this.$router.push({ name: "OnePageMessage", params: { id: messageId } });
    }
  }
};
</script>

<style scoped>
label{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
    color:white;
    font-size: small;
    margin-bottom: 6px;
}

.input_file-message {
  font-size: 10px;
  color: #f05454;
  margin-bottom: 10px;
  margin-bottom: 10px;
  border-radius: 7px;
  max-width:100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.form-row{
  width: 100%;
}
h5 {
  color: #f05454;
}
.flex_collum{
  display: flex;
  flex-direction: collumn;
  justify-content: center;
  flex-wrap: wrap;

}
.scroll_allMessage {
  resize: vertical;
  overflow: scroll;
  background-color: #30475e;
  border-radius: 7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0, 0, 0, 0.44);
  box-shadow: 9px 8px 21px 1px rgba(0, 0, 0, 0.44);
  width: 400px;
  height: 500px;
  display: flex;
  padding-top: 30px;
}
.form_row_input {
  padding: 5px;
  border: none;
  border-radius: 8px;
  background: #e8e8e8;
  font-weight: 500;
  font-size: 12px;
  width: 100px;
  height:10px;
  color: black;
  margin-bottom: 10px;
}
.form_row_input:focus {
  background-color: #d8d8d8;
}
.card_label{
  color: #f05454;
  font-weight:bold;
  font-size: 0.8rem;
}
.form_row-textarea {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #e8e8e8;
  font-weight: 500;
  font-size: 16px;
  max-width: 75%;
  color: black;
  margin-top:10px;
  margin-bottom: 10px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  resize: none;
}
.form_row-textarea:focus {
  background-color: #d8d8d8;
  border: solid 2px #3366ff;
}
.form-row_conect {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;  
  margin-top: 20px;
}
.ReseauSocial {
  padding-bottom: 20px;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: #30475e;
  border-radius: 7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0, 0, 0, 0.44);
  box-shadow: 9px 8px 21px 1px rgba(0, 0, 0, 0.44);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  min-width: 230px;
  overflow-y: scroll;
}
.button_message-modifier{
  background: #f05454;
  color: white;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  transition: 0.4s background-color;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  font-size: 10px;
  height: 30px;
  min-width: 75px;
  margin-bottom: 10px;
}
.button_message-modifier:hover{
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
  transform: scale(0.9, 1.1);
}
.button_message {
  background: #f05454;
  color: white;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  transition: 0.4s background-color;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  font-size: 10px;
  height: 30px;
  min-width: 75px;
  margin-bottom: 10px;
}
.button_message:hover {
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
  transform: scale(0.9, 1.1);
}

.card_title {
  color: #f05454;
  margin-left: 20px;
  margin-top: 20px;
}
.card_title-modifier{
  margin-top: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
p {
  color: white;
}
.card_modify-message {
  margin-top: 25px;
  width: 88%;
  padding-top: 20px;
  display: flex;
  flex-direction: collumn;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 30px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;
}
#content_message {
  width: 80%;
  border-radius: 25px;
  border-color: #f05454;
  margin-bottom: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;
  overflow-y: scroll;
  height: 600px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>