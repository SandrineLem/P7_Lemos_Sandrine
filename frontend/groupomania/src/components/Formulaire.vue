<template>
    <div>
        <div class="card">
            <h1 class="card_title" v-if="mode == 'login'">Connexion</h1>
            <h1 class="card_title" v-else >Inscription</h1>
            <p class="card_subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ?<span class="card_action" @click="switchToCreateAccount()">Créer un compte</span></p>
            <p class="card_subtitle" v-else>Tu as déjà un compte ?<span class="card_action" @click="switchToLogin()">Se connecter</span></p>
            <div class="form-row">
                <input v-model="email" type="email" class="form_row_input" placeholder="Adresse mail"/>
            </div>
            <div class="form-row" v-if="mode == 'create'">
                <input v-model="Prenom" type="text" class="form_row_input" placeholder="Prénom"/>
                <input v-model="nom" type="text" class="form_row_input" placeholder="Nom"/>
            </div>
            <div class="form-row">
                <input v-model="password" type="password" class="form_row_input" placeholder="Mot de passe"/>
            </div>
            <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
                Adresse mail et/ou mot de passe invalide
            </div>
            <div class="form-row" v-if="mode == 'create ' && status == 'error_create'">
                Adresse mail déjà utilisée
            </div>
            <div class="form-row">
                <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}"  v-if="mode == 'login'">
                    <span v-if="status == 'loading' ">Connexion en cours...</span> 
                    <span v-else @click="logout()">Connexion</span>  
                </button>
                <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
                    <span v-if="status == 'loading' ">Création en cours...</span>
                    <span v-else @click="logout()">Créer mon compte</span> 
                </button>  
            </div>
        </div>
    </div>
    
</template>

<script>

import {mapState } from 'vuex'
    export default {
        name: 'Formulaire',
        data: function() {
            return {
                mode: 'login',
                email: '',
                prenom:'',
                nom: '',
                password:'',
            }
        },
        mounted: function () {
            if(this.$store.state.userId == -1){
                this.$router.push('/profile');
                return;
            }
        },
        computed:{
            validatedFields: function () {
                if (this.mode == 'create'){
                    if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != ""){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    if(this.email != "" && this.password !=""){
                        return true;
                    }else{
                        return false;
                    }
                } 
            },
            ...mapState (['status'])
        },
        methods:{
            logout: function(){
            this.$store.commit('logout');
            this.$router.push('/');
        },
            switchToCreateAccount: function() {
                this.mode = 'create';
            },
            switchToLogin: function() {
                this.mode = 'login';
            },
            login: function(){
                const self = this;
                this.$store.dispatch('login',{
                    email: this.email,
                    password:this.password
                })
                .then(function(response){
                    self.$router.push('/profile');
                }),function(error){
                    console.log(error);
                }
            },
            createAccount: function() {
                const self = this;
                this.$store.dispatch('createAccount',{
                    email: this.email,
                    nom: this.nom,
                    prenom:this.prenom,
                    password:this.password
                })
                .then(function(){
                    self.login();
                }),function(error){
                    console.log(error);
                }
            },
        }

    }
</script>

<style scoped>
.form-row{
    display: flex;
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
.form-row_input::placeholder{
    color: #aaaaaa;
}
</style>
