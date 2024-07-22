const contenuePanier = document.querySelector(".contenuePanier");
const chiffrePanier = document.querySelector(".quantité-bag-panier");
const chiffrePanierPage = document.querySelector(".quantité-bag");

let listProductHTML = document.querySelector(".liste-produits");
let listCartHTML = document.querySelector(".contenuePanier");
// let iconCart = document.querySelector('.quantité-bag');
let iconCartSpan = document.querySelector(".quantité-bag");
const chiffrePanierDansPanier = document.querySelector(".quantité-bag-panier");
const totalPanier = document.getElementById("totalDuPanier");
let products = [];
let cart = [];
const votrePanier = document.getElementById("votrePanier");
const boutonExplorer = document.querySelector(".btn-explorez-produits");
const panierVide = document.querySelector(".panier-vide");
const titreProduit = document.getElementById("titreProduit");
const téléphone = document.getElementById("téléphone");
const bagues = document.getElementById("bague");
const ecouteur = document.getElementById("écouteur");
const macbook = document.getElementById("macbook");
const ordinateur = document.getElementById("ordinateur");
const bouteille = document.getElementById("bouteille");
const chargeur = document.getElementById("chargeur");
const imageProduit = document.querySelector(".imageClasse");

const addDataToHTML = (products) => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("produit");
      newProduct.innerHTML = `<img alt="image produit" class="imageClasse" src="${product.image[0]}">
                <p class="titreClasse">${product.nom}</p>
                <p class="catégorieClasse" >${product.catégorie}</p>
                <p class="prixClasse">${product.prix}€</p>
                <img class="bagPlus" src="${product.image[2]}">`;

      listProductHTML.appendChild(newProduct);
    });
  }
};
listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;

  if (positionClick.classList.contains("imageClasse")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let totalDuTotal = 0;

  if (cart.length > 0) {
    cart.forEach((item) => {
      votrePanier.innerText = "Votre Panier";
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;
      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      totalDuTotal += info.prix * item.quantity;
      boutonExplorer.remove();

      newItem.innerHTML = `

                    <img class="imageClasse" src="${info.image[0]}">
            <div class="panierSansImage">
                <p class= "titreClassePanier">
                ${info.nom}<p/>
                <p class="catégorieClassePanier" >${info.catégorie}</p>
                
                <p class="totalPricePanier">${info.prix * item.quantity}€</p>
                <button class="minus">-</button>
                <span>${item.quantity}</span>
                <button class="plus">+</button> 
            </div>
           
            `;
    });
  }
  totalPanier.innerText = totalDuTotal;
  iconCartSpan.innerText = totalQuantity;
  chiffrePanierDansPanier.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
          votrePanier.innerText = "Votre Panier est vide";
          panierVide.appendChild(boutonExplorer);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  // get data product
  fetch("article.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML(products);

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();

// Bouton de filtrage
const reponse = await fetch("article.json");
const article = await reponse.json();

téléphone.addEventListener("click", () => {
  const téléphoneFiltrer = article.filter((piece) => {
    return piece.catégorie === "Coque de Téléphone";
  });
  titreProduit.innerText = "Coques de téléphone";
  listProductHTML.innerHTML = "";
  addDataToHTML(téléphoneFiltrer);
});

bagues.addEventListener("click", () => {
  const bagueFiltrer = article.filter((piece) => {
    return piece.catégorie === "Bague";
  });
  titreProduit.innerText = "Bagues de téléphone";
  listProductHTML.innerHTML = "";
  addDataToHTML(bagueFiltrer);
});
ecouteur.addEventListener("click", () => {
  const ecouteurFiltrer = article.filter((piece) => {
    return piece.catégorie === "Coque Airpods";
  });
  titreProduit.innerText = "Coques pour écouteurs";
  listProductHTML.innerHTML = "";
  addDataToHTML(ecouteurFiltrer);
});
macbook.addEventListener("click", () => {
  const macbookFiltrer = article.filter((piece) => {
    return piece.catégorie === "Coque MacBook";
  });
  titreProduit.innerText = "Coques pour Macbook";
  listProductHTML.innerHTML = "";
  addDataToHTML(macbookFiltrer);
});
ordinateur.addEventListener("click", () => {
  const ordinateurFiltrer = article.filter((piece) => {
    return piece.catégorie === "Housse Ordinateur";
  });
  titreProduit.innerText = "Houses pour ordinateur";
  listProductHTML.innerHTML = "";
  addDataToHTML(ordinateurFiltrer);
});
bouteille.addEventListener("click", () => {
  const bouteilleFiltrer = article.filter((piece) => {
    return piece.catégorie === "Bouteille";
  });
  titreProduit.innerText = "Bouteilles et mugs";
  listProductHTML.innerHTML = "";
  addDataToHTML(bouteilleFiltrer);
});
chargeur.addEventListener("click", () => {
  const chargeurFiltrer = article.filter((piece) => {
    return piece.catégorie === "Chargeur";
  });
  titreProduit.innerText = "Chargeurs";
  listProductHTML.innerHTML = "";
  addDataToHTML(chargeurFiltrer);
});
// Fin de bouton de filtrage
