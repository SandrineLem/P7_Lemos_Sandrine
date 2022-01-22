<template>
  <div id="ReseauSocial">
    <h1>
      Bienvenue sur le Reseau Social de
      <br />Groupomania
    </h1>
    <MessageAll />
    <div class="Card_message">
      <h3 class="card_title">Créer un message</h3>
      <form class="form-row" @submit="postData" method="POST">
        <div class="flexCollum">
          <label for="password">Titre :</label>
        </div>
        <div>
          <input type="text" class="form_row_input" placeholder="Titre du message" name="titlte" v-model="message.titlte"/>
        </div>
        <div>
          <input type="file" name="attachment" @change="onChange" class="input_file-message" />
        </div>
        <div>
          <label for="content">Ecrivez votre message :</label>
        </div>
        <div>
          <textarea class="form_row_input_message" name="content" rows="4" cols="25" v-model="message.content"></textarea>
        </div>
        <div>
          <button type="submit" class="button_message">Envoyer</button>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";
import FromData from "form-data";
import MulterData from "multer";
import MessageAll from "@/components/MessageAll.vue";

export default {
  name: "ReseauSocial",
  components: {
    MessageAll
  },
  data() {
    return {
      message: {
        id: null,
        titlte: null,
        content: null,
        attachment: null
      }
    };
  },
  methods: {
    onChange(event) {
      this.message.attachment = event.target.files[0];
    },

    postData(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", this.message.attachment);
      formData.append("titlte", this.message.titlte);
      formData.append("content", this.message.content);
      if(confirm("Etes vous sûre de vouloir envoyer ce message ? ")){
        axios
        .post("http://localhost:3000/api/message/new", formData, {
          "Content-Type": "multipart/form-data",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token") //the token is a variable which holds the token
          }
        })
        .then(result => {
          console.warn(result);
          alert("Votre message à bien été envoyé !");
          this.$router.go("/reseauSocial");
        });
      }else{
        this.$router.go("/reseauSocial");
      }
    }
  }
};
</script>


<style scoped>
.flexCollum{
  display: flex;
  justify-content: center;
  flex-direction: collumn;
  align-items: center;
}
label{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: bold;
    color:white;
    margin-bottom: 6px;
}
.input_file-message {
  font-size: 10px;
  color: #f05454;
  margin-bottom: 10px;
  margin-bottom: 10px;
}
.card_title {
  color: #f05454;
  margin-left: 20px;
  margin-top: 0;
}
.card_label{
  color: #f05454;
}
h1 {
  padding-top: 10px;
  color: #f05454;
}
h2 {
  color: #f05454;
}
p {
  color: white;
}
#ReseauSocial {
  padding-bottom: 25px;
  margin-top: 15px;
  background-color: #30475e;
  border-radius: 7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0, 0, 0, 0.44);
  box-shadow: 9px 8px 21px 1px rgba(0, 0, 0, 0.44);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
}
.form-row {
  width: 100%;
}
.form_row_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #e8e8e8;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
}
.form_row_input_message {
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
}
.form_row_input_lien {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #e8e8e8;
  font-weight: 500;
  font-size: 10px;
  margin-bottom: 10px;
  margin-top: 20px;
  color: black;
}
.card_create_msg {
  margin-top: 20px;
  width: 100%;
  border-radius: 25px;
  border: solid #f05454;
  border-color: #30475e;
  margin-bottom: 20px;
}
.button_message {
  margin-right: 20px;
  background: #f05454;
  color: white;
  border-radius: 8px;
  font-weight: 15px;
  border: none;
  width: 30%;
  margin-bottom: 10px;
  padding: 16px;
  transition: 0.4s background-color;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  font-size: 12px;
}
.button_message:hover {
  color: white;
  cursor: pointer;
  background: #1976d2;
  transition: all 100ms ease-in;
  transform: scale(0.9, 1.1);
}
.card_button_message {
  display: flex;
  flex-direction: collumn;
}
.content_message {
  width: 80%;
  border-radius: 25px;
  border-color: #f05454;
  margin-bottom: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 5px 15px 5px #000000;
}
.img_message {
  width: 100%;
  margin-bottom: 10px;
}
.Card_message {
  margin-top: 25px;
  width: 80%;
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
</style>