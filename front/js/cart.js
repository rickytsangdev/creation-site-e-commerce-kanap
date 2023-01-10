// montant total du panier
function returnTotal (){

// let totalPrice = 0; 

// let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
// console.log (productInStorage); 

// for (const product in productInStorage) {
//     product = fetch ("http://localhost:3000/api/products" + product.id)


// }
}; 

async function returnCart () {

// //récupération des produits depuis local storage 
let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
console.log (productInStorage); 

// affichage des produits du panier
// sélection de l'id ou je vais injecter le code HTML 
const elementCartItems = document.querySelector ('#cart__items');
console.log (elementCartItems); 

// si le panier est vide : affiche "Le panier est vide" >>
if (productInStorage === null || productInStorage == 0) {
    console.log ("panier storage vide !"); 
    const emptyCart = `<div> Le panier est vide. </div>`; 
    elementCartItems.innerHTML = emptyCart; 
} else {
    // si le panier n'est pas vide : afficher les produits du localStorage >>
    console.log ("panier storage n'est pas vide !"); 
    let noEmptyCart = document.querySelector ('#cart__items'); 

    for ( p = 0; p < productInStorage.length; p++) {
         let article = document.createElement ('article');
         article.setAttribute ('class' , 'cart__item');
         article.setAttribute ('data-id', productInStorage[p].id); 
         article.setAttribute ('data-color', productInStorage[p].color); 
         noEmptyCart.append(article); 
         console.log ('tutu', p); 

        product = await fetch (`http://localhost:3000/api/products/${productInStorage[p].id}`)
        .then (function (response){
            return response.json ();
        })

            console.log(product);
            
            let divImg = document.createElement ('div'); 
            divImg.setAttribute ('class', 'cart__item__img'); 
            article.append(divImg); 

            let img = document.createElement ('img'); 
            img.setAttribute ('src', product.imageUrl);
            img.setAttribute ('alt', product.altTxt); 
            divImg.append(img); 

            let divContent = document.createElement ('div'); 
            divContent.setAttribute ('class', 'cart__item__content'); 
            article.append(divContent); 

            let divContentDescription = document.createElement ('div'); 
            divContentDescription.setAttribute ('class', 'cart__item__content__description')
            divContent.append(divContentDescription);

            let h2 = document.createElement ('h2');
            h2.textContent = product.name;  
            divContentDescription.append(h2);

            let pName = document.createElement ('p');
            console.log (productInStorage, p); 
            pName.textContent = productInStorage[p].color; 
            divContentDescription.append(pName);

            let pPrice = document.createElement ('p');
            pPrice.textContent = product.price * productInStorage[p].quantity + ' €'; 
            divContentDescription.append(pPrice); 

            let divContentSettings  = document.createElement ('div'); 
            divContentSettings.setAttribute ('class', 'cart__item__content__settings');   
            divContent.append(divContentSettings);

            let divSettingsQuantity = document.createElement ('div'); 
            divSettingsQuantity.setAttribute ('class', 'cart__item__content__settings__quantity'); 
            divContentSettings.append(divSettingsQuantity); 

            let pQuantity = document.createElement ('p');
            pQuantity.textContent = 'Qté :'; 
            divSettingsQuantity.append(pQuantity);

            let input = document.createElement ('input');
            input.type = 'number';  
            input.className = 'itemQuantity'; 
            input.name = 'itemQuantity'; 
            input.setAttribute ('min', 1 ); 
            input.setAttribute ('max', 100 );
            input.setAttribute ('value',productInStorage[p].quantity); 
            divSettingsQuantity.append (input);

            // modification de la quantite depuis input
            input.addEventListener ("change", function (){
                // recuperation de l'élément html de quantité -
                const quantityInput = document.querySelector ('.itemQuantity').value;  
                console.log (quantityInput); 
                // ciblage de l'id du produit dont la quantite a ete modifie ? 
                let idProduct = input.closest ('.cart__item').dataset.id; 
                console.log (idProduct); 
                let colorProduct = input.closest ('.cart__item').dataset.color; 
                console.log (colorProduct); 
                // maj dans le local storage en même temps --> 
                for (let product of productInStorage) {
                    if (product.quantity !== quantityInput) {
                        console.log('test ok');
                        localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
                    } else {
                        console.log ('test échoué'); 
                    }
                }
           }); 

            let divContentDelete = document.createElement ('div'); 
            divContentDelete.setAttribute ('class', 'cart__item__content__settings__delete');
            divContent.append(divContentDelete);
            
            let pDelete = document.createElement ('p')
            pDelete.setAttribute ('class', 'deleteItem');
            pDelete.setAttribute ('class', 'btn-supprimer'); 
            pDelete.textContent = "Supprimer"; 
            divContentDelete.append(pDelete);
            
            // suppression du produit au moment du clic sur le bouton suppression 
            pDelete.addEventListener('click', function (){
                console.log ('click'); 
                //quel produit/couleur correspond au bouton supprimer sur lequel j'ai cliqué ? 
                let idRemoved = pDelete.closest('.cart__item').dataset.id; 
                console.log (idRemoved); 
                let colorRemoved = pDelete.closest('.cart__item').dataset.color;
                console.log (colorRemoved); 
                //maj dans le local storage en même temps --> 
                productInStorage = productInStorage.filter (value => value.id !== idRemoved && value.color !== colorRemoved );
                console.log (productInStorage); 
                localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
                // alert pour avertir que le produit a été supprimer et rechargement de la page
                pDelete.closest('.cart__item').remove (); 
                returnTotal(); 
                
            });
    }
}; 
returnTotal(); 
}; 
returnCart (); 
                        