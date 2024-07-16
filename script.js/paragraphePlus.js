// Bouton pour déplier le paragraphe du titre de l'article
const paragrapheVoirPlus=document.querySelector('.paragraphe-voir-plus')
const btnVoirPlus=document.getElementById('btn-voir-plus')


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

