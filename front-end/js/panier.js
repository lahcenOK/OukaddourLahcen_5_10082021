//Récupération de l'objet/
let produits = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

let container = document.getElementById("container");
// Boucle d'Affichage produits
  produits.forEach((produit) => {
  container.innerHTML += `
    <tr class="commande_produit">
        <td>${produit.id}</td>
        <td>${produit.name}</td>
        <td class="quantites text-center">${produit.quantites}</td>
        <td class="prix"  align="right">${produit.price / 100}.00 €</td>
        <td classs="Total" align="right">${produit.quantites * produit.price / 100}.00 €</td>
        <td class="text-center"><button class=" btn btn-danger"  type="submit">Supprimer</button> </td >
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
