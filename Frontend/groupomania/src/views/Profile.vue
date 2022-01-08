<template>
    <div class="profile">
        <div class="card">
            <h1>Espace Perso</h1>
            <p>Ma photo</p>
            <p>{{user.prenom}} {{user.nom}} {{user.email}} </p>
            <img :src="user.photo">
            <div class="form-row">
                <button @click="logout()" class="button">Deconnexion</button>
            </div>  
        </div>
    </div>
</template>

<script>
import { mapState} from 'vuex'

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
    methods:{
        logout: function(){
            this.$store.commit('logout');
            this.$router.push('/');
        }
    }
}
</script>
