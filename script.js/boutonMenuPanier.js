const btnMenu = document.getElementById("btn-menu");
const menu = document.querySelector(".menu");
const boutonCloseMenu = document.querySelector(".boutonClose");
const explorerProduit = document.getElementById("explorer-produit");
const body = document.querySelector(".contenair");
const btnPanier = document.querySelector(".btn-quantité");
const panierPop = document.querySelector(".panier");
const btnPanierClose = document.querySelector(".panier-close");
const btnLoupe = document.getElementById("btn-loupe");
// const recherche = document.querySelector(".recherche");
// const rechercheClose = document.getElementById("recherche-close");
btnMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});

boutonCloseMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
});

btnPanier.addEventListener("click", () => {
  panierPop.classList.toggle("open");
});

btnPanierClose.addEventListener("click", () => {
  panierPop.classList.toggle("open");
});

explorerProduit.addEventListener("click", () => {
  panierPop.classList.toggle("open");
});

// btnLoupe.addEventListener("click", () => {
//   recherche.classList.toggle("ouvert");
// });
// rechercheClose.addEventListener("click", () => {
//   recherche.classList.toggle("ouvert");
// });
//
