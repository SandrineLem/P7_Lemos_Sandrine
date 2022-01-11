<template>
    <div class="UpdateProfile">
        <div class="card">
            <h1 class="card_title">Modification de mot de passe</h1>
            <form method="post">
                <div class="form-row">
                <p>Saisir votre mot de passe :</p>
                <input type="password" class="form_row_input" placeholder="Mot de passe"/>
                <p>Saisir votre nouveau mot de passe :</p>
                <input type="password" class="form_row_input" placeholder="Mot de passe"/>
                </div>
                <div class="form-row_profile">
                <button class="button">Confirmer</button>
                <button @click="profile()" class="button">Annuler</button>
                </div>   
            </form>
        </div>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script>

import { mapState} from 'vuex'
import Footer from '../components/Footer.vue'
export default {
    name: 'UpdateProfile',
  components: {
    Footer
  },
    name: 'Profile',
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
        profile: function(){
            this.$store.commit('profile');
            this.$router.push('/profile');
        },
        modifyPass: function(){
            this.$store.commit('profile');
            this.$router.push('/');
        }
    },

}
</script>
<style scoped>
.UpdateProfile{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}
.form-row_profile{
    display: flex;
    flex-direction:row;
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

</style>
