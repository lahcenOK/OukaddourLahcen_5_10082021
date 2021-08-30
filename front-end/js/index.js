
(async function() {
  //fonction pour recuperer les articles 
    const produits = await getProduits()
   
    for (produit of produits) {
      displayProduit(produit)
    }
  })()
   function getProduits() {
     //chercher les infos avec fetch dans serveur
    return fetch("http://localhost:3000/api/cameras")
      .then(function(Response) {
        return Response.json()
      })
      .catch(function(err) {
        alert("Service momentanément indisponible");
      });
  }
  
  function displayProduit(produit) {
    const templateElt = document.getElementById("templateProduit")
    const cloneElt = document.importNode(templateElt.content, true)
// clonner et affichage les éléments
    cloneElt.getElementById("produitImage").src = produit.imageUrl
    cloneElt.getElementById("_id").textContent = `Réf : ${produit._id}`
    cloneElt.getElementById("name").textContent = produit.name
    cloneElt.getElementById("price").textContent = `Prix : ${produit.price / 100}.00 €` 
    cloneElt.getElementById("description").textContent = produit.description
    cloneElt.getElementById("produit_link").href += `?id=${produit._id}`
    document.getElementById("main").appendChild(cloneElt)
  }
