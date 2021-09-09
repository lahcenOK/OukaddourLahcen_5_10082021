// Fiche produit
class produit {
  constructor({
    _id,
    imageUrl,
    name,
    price,
    quantites,
    lenses,
    description,
  }) {
    this.id = _id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.price = price;
    this.quantites = parseInt(quantites, 10); // transforme chaine de caractère en nombre
    this.lenses = lenses;
    this.description = description;
  }
};

// Récuperer l'url
let params = (new URL(document.location)).searchParams
//Stocker l'id produit
const id = params.get("id")
//Emplacement dans HTML
let container = document.getElementById("container");

// Inserer structure html du produit
display = produit => {
  container.innerHTML =`
    <div id="produits" class="produits">
      <div class="card mb-3">
        <img src=${produit.imageUrl} alt="photo produit">
        <h4 class="nom">${produit.name}</h4>
        <P class="_id"> Réf : ${produit.id}</p>
        <h5 class="prix"> Prix Unitaire: ${produit.price/ 100}.00€</h5>
        <p class="description">${produit.description}</p>
        <h5> Lentilles : </h5>
        <select  id="lense" class="lentille">
        <option>choix lentilles</option>
        </select> 
        <h5> Quantité : </h5>
        <select id="quantites" class="quantites">         
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select> 
        <a  class="text-center fs-5" href ="./panier.html">
        <button id="ajouter" type ="submit" value="submit" class="btn-primary fs-6 fw-bold"> Ajouter au panier</button></a>
        <a class="card-footer text-center fs-6 fw-bold" href="../index.html">Revenir à la liste des produits</a>       
      </div>
    </div>
  `;

// Ajout d'option des lentilles
  for (let lenses of produit.lenses){ 
    document.getElementById("lense").innerHTML =
      `<option value="lenses">${lenses}<option>`; 
  }
// Evenement click  
  document.getElementById('ajouter').addEventListener('click', function () {
          addPrdPanier(produit) 
  });
};

// Sauvegarde du panier dans le localstorage
const addlocalStorage = panier => {
  localStorage.setItem('panier', JSON.stringify(panier));
}  
// Ajout de la quantité 
const addPrdPanier = produit=> {
  produit.quantites = parseInt(document.getElementById('quantites').value);

///Récuperer le panier
  let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

////Le parcourt du panier 
  let PrdtExist = false;
  for (let i = 0; i < panier.length; i++) {
    let NVproduit = panier[i];

/////Si produit existe
    if (NVproduit.id === produit.id) {
      PrdtExist = i;
    }
  };
//// Produit existe dans le panier on ajoute la quantité
    if (false !== PrdtExist) {
      panier[PrdtExist].quantites = parseInt(panier[PrdtExist].quantites) + produit.quantites;
    } else {
      panier.push(produit);
    };
  addlocalStorage(panier);
};

// Appel de l'API
fetch("http://localhost:3000/api/cameras/" + id)
.then(response => response.json())
.then(function (NVproduit) {
 produit = new produit(NVproduit)
 display(produit);
})
.catch(function(err){
alert("Ajouter le panier");
});