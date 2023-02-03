// --DÉBUT DE LA MISE EN PLACE DU PANIER--
// calcul du prix total des produits
async function renderTotalPrice (){
    // déclaration des variables pour y mettre le prix des produits qui y sont présents 
    let totalItemPrice = 0;
    let totalItemQuantity = 0; 

    // récupération des produits du local storage et parcours du tableau
    let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
    for (let i = 0; i < productInStorage.length; i++) {
        product = await fetch (`http://localhost:3000/api/products/${productInStorage[i].id}`)
        .then (function (response){
            return response.json ();
        }); 
        totalItemPrice += productInStorage[i].quantity * product.price; 
        totalItemQuantity += productInStorage[i].quantity; 
    };
    document.getElementById('totalPrice').innerHTML = totalItemPrice; 
    document.getElementById('totalQuantity').innerHTML = totalItemQuantity; 
};
// affichage des produits
async function returnCart () {
    // //récupération des produits du local storage
    let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));

    // sélection de l'id pour intégrer les produits à bonne place
    const elementCartItems = document.querySelector ('#cart__items');

    // condition si : le local storage est vide ! 
    if (productInStorage === null || productInStorage == 0) {
        const emptyCart = `<div> Le panier est vide. </div>`;
        elementCartItems.innerHTML = emptyCart;
    } else {
        // condition sinon : le local storage contient des produits !
        let cartItemsSection = document.querySelector ('#cart__items');

        for ( i = 0; i < productInStorage.length; i++) {
            let article = document.createElement ('article');
            article.setAttribute ('class' , 'cart__item');
            article.setAttribute ('data-id', productInStorage[i].id);
            article.setAttribute ('data-color', productInStorage[i].color);
            cartItemsSection.append(article);

            product = await fetch (`http://localhost:3000/api/products/${productInStorage[i].id}`)
            .then (function (response){
                return response.json ();
            }); 

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
            pName.textContent = productInStorage[i].color;
            divContentDescription.append(pName);

            let pPrice = document.createElement ('p');
            pPrice.textContent = product.price + ' €';
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
            input.setAttribute ('value',productInStorage[i].quantity);
            divSettingsQuantity.append (input);

            // modification de la quantité
            input.addEventListener ("change", function (event){
                if (event.target.value <= 0) {
                    alert( "veuillez insérer un nombre supérieur à 0"); 
                    return; 
                } else if (event.target.value > 100) {
                    alert( "Veuillez insérer un nombre inférieur à 100"); 
                    return; 
                }; // recherche de l'identifiant et de la couleur du produit
                let idProduct = input.closest ('.cart__item').dataset.id;
                let colorProduct = input.closest ('.cart__item').dataset.color;
                // mise à jour du local storage suite à la modification 
                let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
                for (let i = 0; i < productInStorage.length; i++) {
                    if (productInStorage[i].color === colorProduct && productInStorage[i].id === idProduct) {
                        productInStorage[i].quantity = parseInt(event.target.value);
                    }
                }; 
                localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
                // mise à jour du prix total des produits 
                renderTotalPrice (); 
            });

            let divContentDelete = document.createElement ('div');
            divContentDelete.setAttribute ('class', 'cart__item__content__settings__delete');
            divContent.append(divContentDelete);

            let pDelete = document.createElement ('p')
            pDelete.setAttribute ('class', 'deleteItem');
            pDelete.setAttribute ('class', 'btn-supprimer');
            pDelete.textContent = "Supprimer";
            divContentDelete.append(pDelete);

            // suppression d'un produit
            pDelete.addEventListener('click', function (){  
                let closestId = pDelete.closest('.cart__item').dataset.id; 
        
                let closestColor = pDelete.closest('.cart__item').dataset.color; 
                let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
                if (productInStorage = productInStorage.filter (item => item.id !== closestId && item.color !== closestColor)) {
                    localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
                    pDelete.closest ('.cart__item').remove (); 
                    // mise à jour du prix total des produits
                    renderTotalPrice ()
                }; 
            });
        }; 
    };
    renderTotalPrice();
    };
    returnCart (); 
// --FIN DE LA MISE EN PLACE DU PANIER--.

// --MISE EN PLACE DU FORMULAIRE DE CONTACT--
// Vérification de la saisie du prénom
function firstNameValidated() {
    let error = document.getElementById('firstNameErrorMsg'); 
    let firstName = document.getElementById('firstName'); 
    let firstNameValue = firstName.value.trim (); 
    
    if (firstNameValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
         //saisie non valide, affichage du message d'erreur
        error.innerHTML= 'le prénom doit faire plus de 2 caractères';
        return false;  
    }
}
// Vérification de la saisie du nom
function lastNameValidated() {
    let error = document.getElementById('lastNameErrorMsg'); 
    let lastName = document.getElementById('lastName'); 
    let lastNameValue = lastName.value.trim(); 
   
    if (lastNameValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
        //saisie non valide, affichage du message d'erreur
        error.innerHTML= 'le nom doit faire plus de 2 caractères';
        return false; 
    };
};
// Vérification de la saisie de l'adresse
function addressValidated() {
    let error = document.getElementById('addressErrorMsg'); 
    let address = document.getElementById('address'); 
    let addressValue = address.value.trim(); 
   
    if (addressValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
        //saisie non valide, affichage du message d'erreur
        error.innerHTML= 'l\'adresse doit faire plus de 2 caractères'; 
        return false;
    };
}; 
// Vérification de la saisie de la ville
function cityValidated() {
    let error = document.getElementById('cityErrorMsg'); 
    let city = document.getElementById('city'); 
    let cityValue = city.value.trim(); 
   
    if (cityValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
        //saisie non valide, affichage du message d'erreur
        error.innerHTML= 'le nom de la ville doit faire plus de 2 caractères'; 
        return false;
    }
}; 
// Vérification de la saisie de l'email avec REGEX
function emailValidated() {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let error = document.getElementById('emailErrorMsg'); 
    let emailAddress = document.getElementById('email'); 
    let emailAddressValue = emailAddress.value.trim (); 
    if (emailAddressValue == "") {
        //saisie non valide, affichage du message d'erreur
        error.innerHTML = "l'adresse e-mail est requise"; 
        return false;
    } else if (!regEmail.test (emailAddressValue)) {
         //saisie non valide, affichage du message d'erreur
        error.innerHTML= "L'adresse e-mail doit être dans un format valide avec le symbole @"; 
        return false;
    } else {
        error.innerHTML= ""; 
        return true;
    }; 
}; 
// Passage de la commande
document.getElementById('form').addEventListener('submit', function (event){
    event.preventDefault (); 
    // condition si : le formulaire est entièrement valide !
    if (firstNameValidated() &&  lastNameValidated() && addressValidated() && cityValidated() &&  emailValidated()) {
        // envoie des données du formulaire au back-end
        let firstNameEntry = document.getElementById('firstName').value;
        let lastNameEntry = document.getElementById('lastName').value;
        let addressEntry = document.getElementById('address').value;
        let cityEntry = document.getElementById('city').value; 
        let emailEntry = document.getElementById('email').value; 

        // création de l'objet conforme au back-end
        let products = [ ]; // nouveau tableau de product_id
        let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
        for (let i = 0; i < productInStorage.length; i++) {
            products.push(productInStorage[i].id); 
        }; 

        let userData = {
            contact : {
                firstName : firstNameEntry,   
                lastName : lastNameEntry,
                address: addressEntry, 
                city: cityEntry, 
                email: emailEntry, 
            }, 
           products, 
        }; 

        // création de l'option
        let options  =  {
            method: 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            },  
            body : JSON.stringify(userData), 
        }; 

        fetch (`http://localhost:3000/api/products/order`, options)
       .then (function (response){
        return response.json (); 
       }).then (function (order){
        // récupération de la réponse du serveur
        let orderId = order.orderId; 
        localStorage.removeItem('cartStorage');

        // // redirection vers page de confirmation
        window.location.href = `./confirmation.html?orderId=${orderId}`; 
       }) 
    }
});
// FIN DE LA MISE EN PLACE DU FORMULAIRE DE CONTACT.      

