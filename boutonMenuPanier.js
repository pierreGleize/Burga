
const  btnMenu=document.getElementById('btn-menu')
const menu =document.querySelector('.menu')
const boutonCloseMenu=document.querySelector('.boutonClose')


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

const reponse= await fetch('article.json')
const data= await reponse.json()




