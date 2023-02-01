async function renderTotalPrice (){
    // declaration de la variable pour y mettre les prix qui sont présent
    let totalItemPrice = 0;
    let totalItemQuantity = 0; 

    // pour chaque produit présent dans le local storage
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

async function returnCart () {
// //récupération des produits depuis local storage
let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));

// affichage des produits du panier
// sélection de l'id ou je vais injecter le code HTML
const elementCartItems = document.querySelector ('#cart__items');

// si le panier est vide : affiche "Le panier est vide"
if (productInStorage === null || productInStorage == 0) {
    const emptyCart = `<div> Le panier est vide. </div>`;
    elementCartItems.innerHTML = emptyCart;
} else {
    // si le panier n'est pas vide : afficher les produits du localStorage
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
        })

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
        pPrice.textContent = product.price * productInStorage[i].quantity + ' €';
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

        // modification de la quantite depuis input
        input.addEventListener ("change", function (event){
            // recuperation de l'élément html de quantité -
            if (event.target.value <= 0) {
                alert( "veuillez insérer un nombre supérieur à 0"); 
                return; 
            } else if (event.target.value > 100) {
                alert( "Veuillez insérer un nombre inférieur à 100"); 
                return; 
            }; 
            // ciblage de l'id du produit dont la quantite a ete modifie ?
            let idProduct = input.closest ('.cart__item').dataset.id;
            let colorProduct = input.closest ('.cart__item').dataset.color;
            // maj dans le local storage en même temps
            let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
            for (let i = 0; i < productInStorage.length; i++) {
                if (productInStorage[i].color === colorProduct && productInStorage[i].id === idProduct) {
                    productInStorage[i].quantity = parseInt(event.target.value);
                }
            }; 
            localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
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

        // suppression du produit au moment du clic sur le bouton suppression
        pDelete.addEventListener('click', function (){  
            let closestId = pDelete.closest('.cart__item').dataset.id; 
       
            let closestColor = pDelete.closest('.cart__item').dataset.color; 
            let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));
            if (productInStorage = productInStorage.filter (item => item.id !== closestId && item.color !== closestColor)) {
                localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
                pDelete.closest ('.cart__item').remove (); 
                renderTotalPrice ()
            }; 
        });
    }; 
};
renderTotalPrice();
};
returnCart ();

// Formulaire de contact 
// Je vérifie les données du formulaire saisies par l'utilisateur avec des REGEX 


function firstNameValidated() {
    let error = document.getElementById('firstNameErrorMsg'); 
    let firstName = document.getElementById('firstName'); 
    let firstNameValue = firstName.value.trim (); 
    
    if (firstNameValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
        error.innerHTML= 'le prénom doit faire plus de 2 caractères';
        return false;  
    }
}
function lastNameValidated() {
    let error = document.getElementById('lastNameErrorMsg'); 
    let lastName = document.getElementById('lastName'); 
    let lastNameValue = lastName.value.trim(); 
   
    if (lastNameValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
        error.innerHTML= 'le nom doit faire plus de 2 caractères';
        return false; 
    };
};
function adressValidated() {
    let error = document.getElementById('addressErrorMsg'); 
    let address = document.getElementById('address'); 
    let addressValue = address.value.trim(); 
   
    if (addressValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
        error.innerHTML= 'l\'adresse doit faire plus de 2 caractères'; 
        return false;
    };
}; 
function cityValidated() {
    let error = document.getElementById('cityErrorMsg'); 
    let city = document.getElementById('city'); 
    let cityValue = city.value.trim(); 
   
    if (cityValue.length > 2 ) {
        error.innerHTML = ""; 
        return true;
    } else {
        error.innerHTML= 'le nom de la ville doit faire plus de 2 caractères'; 
        return false;
    }
}; 
function emailValidated() {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let error = document.getElementById('emailErrorMsg'); 
    let emailAddress = document.getElementById('email'); 
    let emailAddressValue = emailAddress.value.trim (); 
    if (emailAddressValue == "") {
        error.innerHTML = "l'adresse e-mail est requise"; 
        return false;
    } else if (!regEmail.test (emailAddressValue)) {
        error.innerHTML= "L'adresse e-mail doit être dans un format valide avec le symbole @"; 
        return false;
    } else {
        error.innerHTML= ""; 
        return true;
    }; 
}; 
document.getElementById('form').addEventListener('submit', function (event){
    event.preventDefault (); 
    // validation du prénom 
    console.log (firstNameValidated(),  lastNameValidated(), adressValidated(), cityValidated(),emailValidated()); 
    if (firstNameValidated() &&  lastNameValidated() && adressValidated() && cityValidated() &&  emailValidated()) {
        console.log ('titi'); // passer la commande  ici >> 
        // Le code pour 'passer la commande' se trouve dans cette condition >>>>>>>>>> 

        // création de l'objet donnée de l'utilisateur
        let firstNameEntry = document.getElementById('firstName').value;
        let lastNameEntry = document.getElementById('lastName').value;
        let addressEntry = document.getElementById('address').value;
        let cityEntry = document.getElementById('city').value; 
        let emailEntry = document.getElementById('email').value; 

        let products = [ ]; 
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
           products, // tableau de product_id
        }; 

        // création de l'option
        let options  =  {
            method: 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            },  
            body : JSON.stringify(userData), 
        }; 

        // je fetch sur la bonne route 
        fetch (`http://localhost:3000/api/products/order`, options)
       .then (function (response){
        return response.json (); 
       }).then (function (products){
        // récupération de l'id de la response du serveur
        console.log (products.orderId); 
        // mettre l'id dans le local storage
        localStorage.setItem('orderId', products.orderId); 
        // redirection vers confirmation.html
        window.location = "./confirmation.html"; 
       }) 
    }
});     

