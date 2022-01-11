<template>
    <div class="profile">
        <div class="card">
            <h1 class="card_title">Voici votre profil </h1>
            <img :src="src ||'avatar_femme.png'" class="avatar_profil" alt="Avatar pour le profil">
            <p>Votre nom: {{user.nom}}</p>
            <p>Votre prenom: {{user.prenom}}</p>
            <p>Votre email: {{user.email}}</p>
            <div class="form-row_profile">
                <button  @click="modifyPass()" class="button">Modifier mon mot de passe</button>
                <button @click="logout()" class="button">Se deconnecter</button>
                <button class="button">Supprimer mon compte</button>
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
export default {
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
    components: {
    Footer
  },
    methods:{
        logout: function(){
            this.$store.commit('logout');
            this.$router.push('/');
        },
        modifyPass: function(){
            this.$store.commit('update/profile');
            this.$router.push('/update/profile');
        }
    }
}
</script>
<style scoped>
.profile{
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
.avatar_profil{
    width: 3rem;
    height: 3rem;
    border-radius: 100% ;
}
</style>
