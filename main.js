const contenuePanier = document.querySelector('.contenuePanier')
const chiffrePanier = document.querySelector('.quantité-bag-panier')
const chiffrePanierPage = document.querySelector('.quantité-bag')

let listProductHTML = document.querySelector('.liste-produits');
let listCartHTML = document.querySelector('.contenuePanier');
// let iconCart = document.querySelector('.quantité-bag');
let iconCartSpan = document.querySelector('.quantité-bag');
const chiffrePanierDansPanier = document.querySelector('.quantité-bag-panier')
let totalPanier = document.querySelector('.totalPanier')
let products = [];
let cart = [];




    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('produit');
                newProduct.innerHTML = 
                `<img class ="imageClasse" src="${product.image[0]}" alt="">
                <p class="titreClasse">${product.nom}</p>
                <p class="catégorieClasse" >${product.catégorie}</p>
                <p class="prixClasse">${product.prix}€</p>
                <img class="bagPlus" src="${product.image[2]}">`
                
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('imageClasse')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `

                    <img class="imageClasse" src="${info.image[0]}">
                
                <p class= "titreClassePanier">
                ${info.nom}<p/>
                <p class="catégorieClassePanier" >${info.catégorie}</p>
                
                <div class="totalPricePanier">$${info.prix * item.quantity}</div>
                <div class="quantité">
                    <button class="minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus">+</button>
                </div>
                
            `;  
            totalPanier.innerText= totalQuantity*info.prix*item.quantity
            
           
        })
    }
    iconCartSpan.innerText = totalQuantity;
    chiffrePanierDansPanier.innerText = totalQuantity
    
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                    totalPanier.innerText=0
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('article.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();
