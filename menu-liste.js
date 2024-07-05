let  btnMenu=document.getElementById('btn-menu')
let menu =document.querySelector('.menu')
const boutonClose=document.querySelector('.boutonClose')
btnMenu.addEventListener('click',()=>{
    menu.classList.toggle('open')
   
})
boutonClose.addEventListener('click',()=>{
    menu.classList.toggle('open')
})