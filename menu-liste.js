// Lier le fichier JSON
const reponse= await fetch('article.json')
const data= await reponse.json()

// Bouton pour ouvir et fermer le panier et le menu
const  btnMenu=document.getElementById('btn-menu')
const menu =document.querySelector('.menu')
const boutonCloseMenu=document.querySelector('.boutonClose')
let listeProduit=document.querySelector('.liste-produits')
const contenuePanier = document.querySelector('.contenuePanier')
const chiffrePanier = document.querySelector('.quantité-bag-panier')
const chiffrePanierPage = document.querySelector('.quantité-bag')
// 
let carts = []
let listPorducts = []
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






// initialiser la page
function addToHtml(){
    listeProduit.innerHTML=""
    data.forEach(element => {
   if(data.length>0){
   let nouveauProduit=document.createElement('div')
   nouveauProduit.classList.add('produit')
   nouveauProduit.dataset.id= element.id
   nouveauProduit.innerHTML=`
   <img class="imageClasse" src="${element.image[0]}">
   <p class="titreClasse" >${element.nom}</p>
   <p class="catégorieClasse" >${element.catégorie}</p>
   <p class="prixClasse">${element.prix}€</p>
   <img class="bagPlus" src="${element.image[2]}">
   `
  listeProduit.appendChild(nouveauProduit)
   
 }

});
}
addToHtml()

listeProduit.addEventListener('click', (event)=>{
    let positionClick = event.target
    if(positionClick.classList.contains("imageClasse")){
        let product_id = positionClick.parentElement.dataset.id
        addToCart(product_id)
    }
})

function addToCart(product_id){
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id)
    if(carts.length <=0){
        carts = [{
            product_id:product_id,
            quantity :1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id :product_id,
            quantity :1
        })
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity +1
         
    }
   
    addCartHtml()
   
}


function addCartHtml(){
    contenuePanier.innerHTML=""
    let totalQuantity =0
    if(carts.length>0){
        carts.forEach(cart =>{
            totalQuantity = totalQuantity + cart.quantity
        let nouveauProduitPanier = document.createElement('div')
        nouveauProduitPanier.classList.add('produitPanier')
        nouveauProduitPanier.dataset.id = cart.product_id
        let positionProduit = data.findIndex((value) => value.id == cart.product_id)
        let info = data[positionProduit]
        nouveauProduitPanier.innerHTML=`<img class="imageClasse" src="${info.image[0]}">
   <p class="titreClasse" >${info.nom}</p>
   <p class="catégorieClasse" >${info.catégorie}</p>
   <p class="prixClasse">${info.prix * cart.quantity}€</p>
   <div class="quantité">
   <span class="moins">-</span>
   <span>${cart.quantity}</span>
   <span class="plus">+</span>
        `
        contenuePanier.appendChild(nouveauProduitPanier)
        })

      
    
    }
    chiffrePanierPage.innerText=totalQuantity
    chiffrePanier.innerText=totalQuantity
      
}


contenuePanier.addEventListener('click', (event)=>{
    let positionClick = event.target
    if(positionClick.classList.contains('moins')|| positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.dataset.id
        let type =  'moins'
        console.log(positionClick)
        if(positionClick.classList.contains('plus')){
            type = 'plus'

        }
        changeQuantity(product_id, type)
    }
    
})
const changeQuantity = (product_id, type) => {
    let positionItemCart = carts.findIndex((value)=> value.product_id == product_id)
    console.log(positionItemCart)
    if(positionItemCart >= 0){
        switch(type){
            case 'plus':
                carts[positionItemCart].quantity = carts[positionItemCart].quantity +1
                console.log(valueChange)
                break;
                default: 
                let valueChange = carts[positionItemCart].quantity -1
                if(valueChange > 0){
                    carts[positionItemCart].quantity = valueChange
                }else{
                    carts.splice(positionItemCart, 1)
                }
                break;
                
        }
    }
    addCartHtml()
}

