
///Récuperer les données (orderId) "url"
let paramsUrl = new URL(window.location).searchParams;
const orderId = paramsUrl.get("orderId")
//Récuperer les données "contact"
let contact = JSON.parse(localStorage.getItem("contact"))
// Récuperer le montant de la commande
let Total = JSON.parse(localStorage.getItem("Total"));

// Affichage HTML
function display (){
    confirmation.innerHTML += `
    </br>
        Nous vous remercions :

        <p> Mr / Mme : <span class ="fw-bold"> ${contact.lastName} </span></p>
    
        <p>Vote commande n°: <span class ="fw-bold"> ${orderId} </span>d'un montant de : <span class ="fw-bold">${Total /100}.00 Euros </span> a été bien pris en compte </p> 
     <p>un message de confirmation vous a été envoyer à l'adresse :<span class ="fw-bold"> ${(contact.email)}</span> </p> 
</br>
    `
};
display ();

window.addEventListener("unload", function () {
    localStorage.clear()
})
