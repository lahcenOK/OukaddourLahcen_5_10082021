//Récupération de l'objet/
let produits = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];
//Emplacement dans HTML
let container = document.getElementById("container");
//déclaration de tableau products(Id) à envoyer au serveur
let products= [];

// Boucle d'Affichage produit
produits.forEach(function(produit) {
  container.innerHTML += `
    <tr class="commande_produit">
        <td data-label="Réference">${produit.id}</td>
        <td data-label="Désignation">${produit.name}</td>
        <td data-label="Quantité" class="quantites text-center">${produit.quantites}</td>
        <td data-label="Prix.Unitaire" class="prix"  align="right">${produit.price / 100}.00 €</td>
        <td data-label="Prix Total" classs="Total" align="right">${produit.quantites * produit.price / 100}.00 €</td>
        <td data-label="Suppression" class="text-center "><button class="fw-bold btn btn-danger"  type="submit">Supprimer</button> </td >
    </tr>
  `;
// Incrémentation de Id.produit dans products
  for (let i = 0; i < produit.quantites; i++) {
    products .push(produit.id);
  }
});

// Delaration de variable pour le total général 
let Total = 0;
// Chercher les produits dans le panier
  for (let j = 0; j < produits.length; j++){
    Total +=  produits[j].price * produits[j].quantites;

    document.getElementById ("Total").innerHTML= Total /100 +".00 €";
  }
  
//Envoyer le  Total du panier au localstorage
  localStorage.setItem('Total', JSON.stringify(Total));

// Supprimer un produit
let removebutton = document.getElementsByClassName("btn-danger");
  for ( let l = 0; l < removebutton.length; l++){
    let button = removebutton[l]
      button.addEventListener('click', function(e) {
        if (produits[l].quantites ==1 )
          { produits.splice(l,1);
        }
        else{
          produits[l].quantites -=1;
        }
        localStorage.setItem('panier', JSON.stringify(produits));
        window.location.reload();
      });
  };

//Vider le panier
const viderPanier = document.getElementById("viderPanier");
  viderPanier.addEventListener("click", () => {
      if (confirm("Etes-vous sur de vider votre panier ?")){
      localStorage.clear();
      window.location.reload();}
  });

// Formulaire
const regexName = /^[a-zA-ZÀ-ÿ_-]{2,20}$/;
const regexAddress = /^[a-zA-ZÀ-ÿ0-9._-\s]{2,30}$/;
const regexCity = /^[a-zA-Z]+[a-zA-Z'À-ÿ -]+$/; 
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,5}$/;

function send () {
// le formulaire est envoyé si les conditions sont remplies 
  let contact = {
    firstName : document.getElementById("nom").value,
    lastName : document.getElementById("prenom").value,
    address : document.getElementById("adresse").value,
    city : document.getElementById("ville").value, 
    email : document.getElementById("email").value,
  };
        
  if(( produits.length > 0)  && 
      (regexName.test(contact.firstName) == true) &&
      (regexName.test(contact.lastName) == true) &&
      (regexAddress.test(contact.address) == true) &&
      (regexCity.test(contact.city) == true) &&
      (regexMail.test(contact.email) == true) ) 
    {
// Appel de l'API
    fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
            'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contact, products})  
    }).then(function(res) {
      return res.json();
    }).then (function(reponse) {
                  localStorage.setItem("contact", JSON.stringify(contact));
                  document.location.href = "confirmation.html?orderId=" + reponse.orderId;                
    })
                
    .catch(function (err){
      alert(err);
    });                 
  } else {
//On empêche l'envoi si l'une des conditions est fausse 
        alert("erreur : completer les informations manquantes de votre commande")
         };
}
//Evénement pour l'envoi de la commande
addEventListener('submit', function(e){
  e.preventDefault();
  send();
});
