
// Recuperer l'url
let params = (new URL(document.location)).searchParams
//Stocker l'id produit
const id = params.get("id")
//Emplacement dans HTML
let container = document.getElementById("container");

// API
fetch("http://localhost:3000/api/cameras/" + id)
.then(response => response.json())
.then(function (produit) {
  display(produit);
})
.catch(function(err){
alert(err)
});
// Inserer structure html du produit
display = produit => {
  container.innerHTML =`
    <div id="produits" class="produits">
      <div class="card mb-3">
        <img src=${produit.imageUrl} alt="photo produit">
        <h4 class="nom">${produit.name}</h4>
        <P class="_id"> Réf : ${produit._id}</p>
        <h5 class="prix"> Prix Unitaire: ${produit.price/ 100}.00€</h5>
        <p class="description">${produit.description}</p>
        <select  id="lense" class="lentille">
        <option>choix lentilles</option>
        </select>
        <select id="quantites" class="quantites">         
        <option> Quantité </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        </select>  
             
        <a  class="text-center" href ="./panier.html">
        <button id="ajouter" type ="submit"   value="submit"> Ajouter au panier</button></a>
        <a class="card-footer text-center" href="../index.html">Revenir à la liste des produits</a>       
      </div>
    </div>
        `;
        // Ajout d'option des lentilles
         for (let lenses of produit.lenses){ 
          document.getElementById("lense").innerHTML +=
          `<option value="lenses">${lenses}<option>`; 
         }
        
   document.getElementById('ajouter').addEventListener('click', function (event) {
    event.preventDefault();

    let  prdlocalstorage = JSON.parse(localStorage.getItem("produit"));

let NVproduit = { 
      Id : produit._id,
      name :  produit.name,
      price : produit.price/ 100,
      quantite : parseInt(document.getElementById('quantites').value),
   };

  if ( prdlocalstorage != null){
    localStorage.getItem("panier", JSON.parse(prdlocalstorage))
  }
    else { prdlocalstorage =[];
      prdlocalstorage.push(NVproduit);
      localStorage.setItem("panier", JSON.stringify(prdlocalstorage))
         }

    });
  };