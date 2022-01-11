<template>
    <div class="FilActualite">
        <div class="cardActu">
            <h2>Bienvenue sur le Fil d'actualité de Groupomania</h2>
             
        </div>
    </div>
        
</template>

<script>

export default {
  name: 'FilActualite',
  props: {
    msg: String
  }
}
</script>

<style scoped>

.cardActu{
    max-height: 100%;
    max-width: 100%;
    background-position: center;
    background-image: url("../assets/icon.png");
    border-radius: 116px;
    padding: 32px;
    margin-bottom: 10px;
    height: 800px;
    width: 900px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    
}
@media screen and (min-width:800px) and (max-width:780px){
.FilActualite{
    width: 400px;
}

}
</style>