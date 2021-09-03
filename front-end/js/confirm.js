
///Récuperer les données "url"
let paramsUrl = new URL(window.location).searchParams;

//Récuperer les données "contact"
let contact = JSON.parse(localStorage.getItem("contact"))

// Récuperer le montant de la commande
let Total = JSON.parse(localStorage.getItem("Total"));

// Affichage HTML
function display (){
    confirmation.innerHTML += `
</br>
        Nous vous remercions :
        <p> Mr. ${contact.lastName} </p>
    
        <p>Vote commande d'un montant de : ${Total /100}.00 Euros a été bien pris en compte </p> 
     <p>un message de confirmation vous a été envoyer à l'adresse : ${(contact.email)}</p> 
</br>
    `
};
display ();