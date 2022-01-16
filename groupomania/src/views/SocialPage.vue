<template>
<div id="ReseauSocial">
        <h2>Bienvenue sur le Reseau Social de<br>Groupomania</h2>
        <div class="Card_message">
            <h2 class="card_title">"Titre du Message"</h2>
            <h3>"Nom de l'utilisateur du message" </h3>
            <div class="img_message">
                <img src="../assets/icon-groupomania-ac.png">
            </div>
            <div class="content_message">
                <p>"Contenu du message "</p>
            </div>
        <div class="card_button_message">
            <button class="button_message">modifier</button>
            <button class="button_message">supprimer</button>
            <button class="button_message">liker</button>
        </div>
    </div>
    <div class="card_create_msg">
            <h2 class="card_title" >Evonyer un message</h2>
            
            <form method="post" class="form-row">
                <input  type="text" class="form_row_input" placeholder="Titre du message"/>
                <label for="message">Ecrivez votre message :</label>

                <textarea class="form_row_input_message" name="message"
                    rows="5" cols="33">
                    
                </textarea>
                <input  type="file" class="form_row_input"/>
                <button type="submit" class="button_message">Envoyer</button>
            </form>  
        </div>

</div>
</template>






<script>
export default {
    name: 'ReseauSocial',
    
}
</script>


<style scoped>
.form_row_input{
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #e8e8e8;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
    margin-bottom:5px;
}
.form_row_input_message{
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #e8e8e8;
    font-weight: 5000000;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
    
}
.card_create_msg{
    margin-top:20px;
    width:100%;
    border-radius:25px;
    border:solid  #f05454;
    border-color: #30475e;
    margin-bottom:20px;
}
.button_message{
    margin-right: 20px;
    background: #30475e;
    color: white;
    border-radius: 8px;
    font-weight: 15px;
    border: none;
    width: 30%;
    margin-bottom: 10px;
    padding: 16px;
    transition: .4s background-color;
}
.card_button_message{
    display:flex;
    flex-direction:collumn;
    
}
.content_message{
    width:80%;
    border-radius:25px;
    border:solid  #f05454;
    border-color: #30475e;
    margin-bottom:20px;
}
.img_message{
    width:100%;
}

.Card_message{
    display:flex;
    flex-direction: column;
    align-items: center;
    border-radius:30px;
    border:solid  #f05454;
    border-color: #30475e;
    width:100%;
}


</style>