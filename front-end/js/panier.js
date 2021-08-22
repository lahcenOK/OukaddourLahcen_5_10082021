
//Récupération de l'objet/
let container = document.getElementById("container");
display = produit => {
  container.innerHTML += `
    <tr >
        <td>${produit.name}</td>
        <td>${produit.quantites}</td>
        <td>${produit.price / 100} €</td>
        <td >${produit.quantite * produit.price / 100} €</td>
    </tr>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td>TOTAL</td>
      <td></td>
    </tr>
  </tfoot>
  `;
};