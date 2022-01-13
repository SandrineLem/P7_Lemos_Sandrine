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