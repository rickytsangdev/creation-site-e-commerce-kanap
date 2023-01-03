async function renderCart () {

// //récupération des produits depuis local storage 
let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
console.log (productInStorage); 

// affichage des produits du panier
// sélection de l'id ou je vais injecter le code HTML 
const elementCartItems = document.querySelector ('#cart__items');
console.log (elementCartItems); 

// si le panier est vide : affiche "Le panier est vide" >>
if (productInStorage === null) {
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

                let divContentDelete = document.createElement ('div'); 
                divContentDelete.setAttribute ('class', 'cart__item__content__settings__delete');
                divContent.append(divContentDelete);

                        let pDelete = document.createElement ('p');
                        pDelete.setAttribute ('class', 'deleteItem');
                        pDelete.textContent = "Supprimer"; 
                        divContentDelete.append(pDelete); 
    }
}; 
}; 
renderCart (); 

// paramétrage de la supression d'un produit via "supprimer" et depuis le local storage. 
let btnSupprimer = document.getElementsByClassName("deleteItem"); 
console.log(btnSupprimer); 

// sélection de l'id qui va être supprimer en écoutant le clic sur le bouton. 
for (let l = 0; l < btnSupprimer.length; l++) {
    btnSupprimer[l].addEventListener ("click", )
}; 
