<template>
    <div class="filActualite">
        <div>
            <FilActualite />
        </div>
    
    <div class="message">
        
        <div class="card_message">
            <h1 class="card_title" >Créer un message</h1>
            
            <form method="post" class="form-row">
                <input  type="text" class="form_row_input" placeholder="Titre du message"/>
                <label for="message">Ecrivez votre message :</label>

                <textarea class="form_row_input_message" id="message" name="message"
                    rows="5" cols="33">
                    
                </textarea>
                <input  type="file" class="form_row_input"/>
                <button @click="logout()" type="submit" class="button">Envoyer</button>
            </form>  
        </div>
    </div>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>

import { mapState} from 'vuex'
import Footer from '../components/Footer.vue'
import FilActualite from '../components/FilActualite.vue'
export default {
  
  name: 'message',
  components: {
    Footer,
    FilActualite
  },

    name: 'message',
    mounted: function () {
        console.log(this.$store.state.user);
        if(this.$store.state.userId == -1){
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('getUserInfos'); 
    },
    computed: {
        ...mapState({
            user: 'userInfos'
        })
    },
    methods:{
        logout: function(){
            this.$store.commit('logout');
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
.card_message{
max-width: 100%;
  width: 900px;
  background-position: center;
  background-image: url("../assets/icon.png");
  border-radius: 116px;
  padding: 32px;
  margin-bottom: 10px;
}
.filActualite{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.message{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;

}
.form-row{
    display: flex;
    flex-direction: column;
    margin: 16px 0px;
    gap: 16px;
    flex-wrap: wrap;
}
.form_row_input{
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #e8e8e8;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: #222831;
}
.form_row_input_message{
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
.form-row_input::placeholder{
    color: #aaaaaa;
}
@media screen and (min-width:800px) and (max-width:780px){
.filActualite{
    width: 650px;
}

}
@media screen and (min-width:800px) and (max-width:780px){
.filActualite{
    max-width: 780px;
    align-content: center;
}

}
</style>
