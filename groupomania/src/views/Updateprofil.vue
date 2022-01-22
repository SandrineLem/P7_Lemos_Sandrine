<template>
    <div class="Updateprofil">
        <h1>Pour modifier votre mot de passe </h1>
        <p>Veuillez remplir le formulaire</p>
        <FormulaireModifyProfil />
    </div>
        
</template>

<script>
// @ is an alias to /src

import FormulaireModifyProfil from '@/components/FormulaireModifyProfil.vue'

export default {
    name: 'Updateprofil',
    components: {
        FormulaireModifyProfil
    },
}
</script>

<style scoped>
.Updateprofil{
  background-color:#30475e;
  border-radius:7px;
  -webkit-box-shadow: 9px 2px 21px 1px rgba(0,0,0,0.44); 
  box-shadow: 9px 8px 21px 1px rgba(0,0,0,0.44);
  width: 100%;
}
h1{
    padding-top:10px;
    color:#f05454;
}
p{
  color: white;
}
</style>