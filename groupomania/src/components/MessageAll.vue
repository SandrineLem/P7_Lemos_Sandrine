<template>
  <div id="content_message">
    <div v-for="message in messages" class="flex_collum">
      <div class="ReseauSocial">
        <p class="card_title">"Message de :</p>
        <p>{{message.titlte}}</p>
        <p>{{message.content}}</p>
        <img v-bind:src="message.attachment" alt v-if="message.attachment != null" />
        <div class="form-row_conect">
          <button @click="switchOneMessage(message.id)" class="button_message">Voir message</button>
          <button
            v-if="tokenUser.userId == message.userId"
            @click="AfficherFormulaire(message.id)"
            class="button_message"
          >modifier</button>
          <button
            v-if="tokenUser.userId == message.userId"
            @click="deleteMessage(message.id)"
            class="button_message"
          >supprimer</button>
          <button class="button_message">liker</button>
        </div>
        <div v-if="messageIdShow == message.id" class="card_modify-message">
          <h5>Modifier votre message</h5>
          <form @submit="putData" method="POST">
            <input
              type="text"
              placeholder="Nouveau Titre"
              class="form_row_input"
              name="titlte"
              v-model="newMessage.titlte"
            />

            <br />

            <input type="file" name="attachment" @change="onChange" class="input_file-message" />
            <br />

            <textarea
              class="form_row-textarea"
              name="content"
              row="4"
              cols="25"
              v-model="newMessage.content"
            ></textarea>
            <button class="button_message" type="submit">Envoyer</button>
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
        attachment: null
      },
      messageIdShow: null
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
h5 {
  color: #f05454;
}
.flex_collum {
  display: flex;
  flex-direction: collumn;
}
.title_Actualite {
  color: #f05454;
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
  border-radius: 8px;
  background: #f2f2f2;
  min-width: 150px;
  min-height: 20px;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: left;
}
.form_row_input:focus {
  background-color: #d8d8d8;
}

.form_row-textarea {
  border-radius: 8px;
  float: left;
  min-width: 90%;
  min-height: 75px;
  outline: none;
  resize: none;
  border: 1px solid grey;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 10px;
  margin-top: 10px;
}
.form_row-textarea:focus {
  background-color: #d8d8d8;
  border: solid 2px #3366ff;
}
.form-row_conect {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 80px;
}
.ReseauSocial {
  padding-bottom: 30px;
  margin-top: 15px;
  background-color: #30475e;
  border-radius: 7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0, 0, 0, 0.44);
  box-shadow: 9px 8px 21px 1px rgba(0, 0, 0, 0.44);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  width: 90%;
  resize: vertical;
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
}
p {
  color: white;
}
.card_modify-message {
  margin-top: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;
  width: 88%;
  border-radius: 25px;
  position: relative;
  padding-bottom: 20px;
}
#content_message {
  width: 55%;
  border-radius: 25px;
  border-color: #f05454;
  margin-bottom: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;
  overflow: scroll;
  height: 600px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>