(async function() {
  //fonction pour récuperer les produits 
    const produits = await getProduits();
  // Parcourt du contenu produits
    for (produit of produits) {
      displayProduit(produit)
    }
  })()
   async function getProduits() {
 //chercher les infos avec fetch dans le serveur
    try {
       const Response = await fetch("http://localhost:3000/api/cameras");
       return await Response.json();
     } catch (err) {
        alert("Service momentanément indisponible");
     }
  }
  
  function displayProduit(produit) {
    const templateElt = document.getElementById("templateProduit")
    const cloneElt = document.importNode(templateElt.content, true)
// Clonner et affichage les éléments
    cloneElt.getElementById("produitImage").src = produit.imageUrl
    cloneElt.getElementById("_id").textContent = `Réf : ${produit._id}`
    cloneElt.getElementById("name").textContent = produit.name
    cloneElt.getElementById("price").textContent = `Prix : ${produit.price / 100}.00 €` 
    cloneElt.getElementById("description").textContent = produit.description
    cloneElt.getElementById("produit_link").href += `?id=${produit._id}`
    document.getElementById("main").appendChild(cloneElt)
  }
