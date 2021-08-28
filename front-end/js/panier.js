

//Récupération de l'objet/
let produits = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

let container = document.getElementById("container");
//display = produit => {
  produits.forEach((produit) => {
  container.innerHTML += `
    <tr class="commande_produit">
        <td>${produit.id}</td>
        <td>${produit.name}</td>
        <td>${produit.quantites}</td>
        <td>${produit.price / 100}.00 €</td>
        <td classs="SousTotal">${produit.quantites * produit.price / 100}.00€</td>
        <td ><button class=" btn btn-danger"  type="submit">Delete</button> </td >
    </tr>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td class="total">TOTAL </td>
      <td></td>
      <td></td>
    </tr>
     </tfoot>
  `;
});

  
 

 // Delaration de variable pour le total général 
let PrixTotal =[] ;
let SousTotal =0;
// Chercher les produits dans le panier
for (let j = 0; j < produits.length; j++){
SousTotal =  produits[j].price * produits[j].quantites;
//Mettre les prix du panier dans la variable TotalPanier
PrixTotal.push(SousTotal);}
// Calcluer le prix total avec méthode reducer
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const TotalPanier = PrixTotal.reduce(reducer,0);
localStorage.setItem('TotalPanier', JSON.stringify(TotalPanier))

const total = document.getElementsByClassName('total');
total.innerHTML= TotalPanier / 100 + ",00 €";


// Supprimer un produit
let removebutton = document.getElementsByClassName("btn-danger");
for ( let l = 0; l < removebutton.length; l++){
let button = removebutton[l]
button.addEventListener('click', function(e) {
      let btnclicked = e.target
    btnclicked.parentElement.parentElement.parentElement.remove()
    recalculer();
    });
};

function recalculer() {
  
  
}


//Vider  le panier
const viderPanier = document.getElementById("viderPanier");
viderPanier.addEventListener("click", () => {
   localStorage.clear();
   totalPanier.clear();
  document.location.reload();
 });
