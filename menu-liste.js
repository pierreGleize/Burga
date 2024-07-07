
// Bouton pour ouvir et fermer le panier et le menu
const  btnMenu=document.getElementById('btn-menu')
const menu =document.querySelector('.menu')
const boutonCloseMenu=document.querySelector('.boutonClose')
const listeProduit=document.querySelector('.liste-produits')

function ouvrirPanierMenu(){
btnMenu.addEventListener('click',()=>{
    menu.classList.toggle('open')
   
})
boutonCloseMenu.addEventListener('click',()=>{
    menu.classList.toggle('open')
})

const btnPanier=document.querySelector('.btn-quantité')
const panierPop=document.querySelector('.panier')
const btnPanierClose=document.querySelector('.panier-close')
btnPanier.addEventListener('click', ()=>{
panierPop.classList.toggle('open')
})
btnPanierClose.addEventListener('click',()=>{
    panierPop.classList.toggle('open')
})
}
ouvrirPanierMenu()

// Bouton pour déplier le paragraphe du titre de l'article
const paragrapheVoirPlus=document.querySelector('.paragraphe-voir-plus')
const btnVoirPlus=document.getElementById('btn-voir-plus')

function changeTexteBouton(){
    let boutonVoirPlus=true
    
    btnVoirPlus.addEventListener('click',()=>{
    if(boutonVoirPlus){
        btnVoirPlus.textContent="VOIR MOINS"
        paragrapheVoirPlus.textContent="Protégez votre téléphone avec style et faites-en un accessoire de mode. Nos coques de téléphone allient protection et style. Il est souvent difficile de trouver le bon compromis mais nous l’avons fait ! Chez BURGA nous créons des accessoires à la pointe de la tendance, qui sont conçus pour durer dans le temps. Tous nos designs sont l'œuvre d’un de nos artistes et réfléchis pour s’adapter au style et à la personnalité de chacun dans le but de renforcer l’estime de soi. Quel que soit le modèle de votre téléphone : iPhone, Samsung Galaxy ou autre, faites votre choix parmi plus de 200 designs !"
    }else{
        btnVoirPlus.textContent="VOIR PLUS"
        paragrapheVoirPlus.textContent="Protégez votre téléphone avec style et faites-en un accessoire de mode. Nos coques de téléphone allient protection et style. Il est souvent difficile de trouver le bon compromis mais nous l’avons fait ! Chez BUR..."
    }
    boutonVoirPlus=!boutonVoirPlus
 })
}
changeTexteBouton()

// Lier le fichier JSON
const reponse= await fetch('article.json')
const data= await reponse.json()

// initialiser la page
function initPage(){
    listeProduit.innerHTML=""
    data.forEach(element => {
   if(data.length>0){
   let nouveauProduit=document.createElement('div')
   nouveauProduit.classList.add('produit')
   nouveauProduit.innerHTML=`
   <img src="${element.image[0]}">
   <p class="titreClasse" >${element.nom}</p>
   <p class="catégorieClasse" >${element.catégorie}</p>
   <p class="prixClasse">${element.prix}€</p>
   <img class="bagPlus" src="${element.image[2]}">
   `
  listeProduit.appendChild(nouveauProduit)
 }
});
}
initPage()

nouveauProduit.addEventListener('click',(event)=>{
let positionClick = event.target
console.log(positionClick)
})