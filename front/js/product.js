//  Récupération de l'id dans l'URL
const queryParams = window.location.href;

// extraction de l'id
var url = new URL(queryParams);
var id = url.searchParams.get("id");

// Appel Fetch vers l'API pour l'identifiant du produit
fetch(`http://localhost:3000/api/products/${id}`)
.then(function(response){
    return response.json ();
}).then (function(product){

    let img = document.createElement('img');
    document.querySelector('.item__img').append(img);
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt",product.altTxt);
    document.querySelector('#title').append(product.name);
    document.querySelector('#price').append(product.price);
    document.querySelector('#description').append(product.description);

    for (let i=0; i < product.colors.length; i++) {
        let option = document.createElement ('option');
        document.querySelector('#colors').append(option);
        option.setAttribute("value", product.colors[i]);
        option.innerText = product.colors[i];
    };
}).catch(function(error){
    error
});

// --DÉBUT DE LA MISE EN PLACE DU LOCAL STORAGE-- 
const addToCart = document.getElementById('addToCart'); 

function orderConfirmation() {
    if (window.confirm ('Votre Kanap est ajouté au panier !\n Pour consulter votre panier, cliquer sur OK')) {
        window.location.href = "./cart.html"; 
    };
}; 

// Écoute de l'ajout au panier
addToCart.addEventListener('click', function() {
    let selectedColor = document.querySelector('#colors').value;
    let seletedNumberOfArticles = document.querySelector('#quantity').value;
 
    // Condition si : la couleur du produit n'a pas été selectionné, le nombre d'article n'est pas compris entre 1 et 100; l'ajout au panier n'est pas valide !
    if (selectedColor === "") {
        // affichage d'un message d'erreur
        alert ('veuillez sélectionner une couleur')
    } 
    else if (seletedNumberOfArticles <= 0 || seletedNumberOfArticles > 100) {
        // affichage d'un message d'erreur
        alert ('veuillez sélectionner une quantité entre 1 et 100')
    }
    else {
        // Condition sinon : Initialisation du local storage !     
        let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));

        let cart = [ ]; // création d'un tableau panier
    
        let selectedArticles = {  
            id : id, 
            color : document.getElementById('colors').value, 
            quantity : parseInt(document.getElementById('quantity').value), 
        }; 
        orderConfirmation (); 
    
    // Dans l'initialisation du local storage, condition si : le produit est déjà présent dans le local storage ! 
        if (productInStorage ) {
            let found = false; // 

            //avec même id + même couleur 
            for (let i = 0; i < productInStorage.length; i++) {
                if (productInStorage[i].id == id && productInStorage[i].color == document.getElementById('colors').value) { // incrémentation de la quantité
                    productInStorage[i].quantity += parseInt(document.getElementById('quantity').value);
                    localStorage.setItem('cartStorage', JSON.stringify(productInStorage)); 
                    found = true;  
                }; 
            } // Dans l'initialisation du local storage, condition si : le local storage contient des produits mais le produit n'est pas présent ! 
            if (found == false) {
                productInStorage.push(selectedArticles); // ajout du produit 
                localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
            }
        } 
    // Dans initialisation du local storage, condition sinon : le local storage est vide !
        else {
            cart = [ ]; 
            cart.push(selectedArticles); // ajout du produit au tableau
            localStorage.setItem('cartStorage', JSON.stringify(cart));
        }
    }
}); 
// --FIN DE LA MISE EN PLACE DU LOCAL STORAGE--. 

