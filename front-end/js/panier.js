//Récupération de l'objet/
let produits = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

let container = document.getElementById("container");
// Boucle d'Affichage produits
  produits.forEach((produit) => {
  container.innerHTML += `
    <tr class="commande_produit">
        <td data-label="Réference">${produit.id}</td>
        <td data-label="Désignation">${produit.name}</td>
        <td data-label="Quantité" class="quantites text-center">${produit.quantites}</td>
        <td data-label="Prix.Unitaire" class="prix"  align="right">${produit.price / 100}.00 €</td>
        <td data-label="Prix Total" classs="Total" align="right">${produit.quantites * produit.price / 100}.00 €</td>
        <td data-label="Suppression" class="text-center"><button class=" btn btn-danger"  type="submit">Supprimer</button> </td >
    </tr>
     `;
});

// Delaration de variable pour le total général 
let Total = 0;
// Chercher les produits dans le panier
for (let j = 0; j < produits.length; j++){
Total +=  produits[j].price * produits[j].quantites;

document.getElementById ("Total").innerHTML= Total /100 +".00 €";
//Envoyer le  Total du panier au localstorage
localStorage.setItem('Total', JSON.stringify(Total));
}

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

//Vider  le panier
const viderPanier = document.getElementById("viderPanier");
viderPanier.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
 });

 // Formulaire
  const regexName = /^[a-zA-ZÀ-ÿ0-9._-]{2,20}$/;
  const regexCity = /^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$/; 
  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-z]{2,5}$/;
  const regexAddress = /^[a-zA-ZÀ-ÿ0-9._-]{2,20}$/;

 function send () {
   // le formulaire est envoyé s'il y a des poroduits dans le panier
   let products= produits;
   let contact = {
     firstName : document.getElementById("nom").value,
     lastName : document.getElementById("prenom").value,
     adress : document.getElementById("adresse").value,
     city : document.getElementById("ville").value, 
     email : document.getElementById("email").value,
    };
    if( ( produits.length > 0)  &&
        (regexName.test(contact.firstName) == true) &&
        (regexName.test(contact.lastName) == true) &&
        (regexAddress.test(contact.address) == true) &&
        (regexCity.test(contact.city) == true) &&
        (regexMail.test(contact.email) == true) )
      
    {
  // Appel de l'API
    fetch("https://ab-p5-api.herokuapp.com/api/cameras/order", {
      method: "POST",
      headers: {
            'Content-Type': 'application/json'
      },
      body: JSON.stringify({contact, products,})     
  })

  .then(function(res) {
      return res.json()
  }) 

  .then (function() {
                        localStorage.setItem("contact", JSON.stringify(contact));
                        document.location.href = "confirmation.html";
                      
                       })
                
  .catch(function (err){
    alert(err);
  });                 
      }
      else {
        //On empêche l'envoi si le panier est vide 
                alert("erreur : votre panier est vide")
              };
    }
  //Evénement pour l'envoi de la commande
 addEventListener('submit', function(e){
  e.preventDefault();
   send();

 });

