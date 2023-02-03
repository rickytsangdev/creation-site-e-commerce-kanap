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
    
    // Dans l'initialisation du local storage, condition si : le produit est déjà présent dans le local storage ! 
        if (productInStorage ) {
            let found = false; // 
            
            //avec même id + même couleur 
            for (let i = 0; i < productInStorage.length; i++) {
                
                if (productInStorage[i].id == id && productInStorage[i].color == document.getElementById('colors').value) { 
                    // Quantité d'ajout de produit maximal de 100   
                    if ((productInStorage[i].quantity + parseInt(document.getElementById('quantity').value)) <= 100) {
                        productInStorage[i].quantity += parseInt(document.getElementById('quantity').value);
                        alert (`${parseInt(document.getElementById('quantity').value)} articles ajoutés à votre panier`); 
                    } else if (productInStorage[i].quantity == 100) {
                        alert ('Vous avez atteint la quantité maximale de 100 articles')
                    }
                    else {
                        alert (`La quantité maximale est de 100 articles, Vous avez ${productInStorage[i].quantity} articles, \n Veuillez modifier la quantité.`)
                    }; 
                    localStorage.setItem('cartStorage', JSON.stringify(productInStorage)); 
                    found = true;  
                  
                }; 
            } // Dans l'initialisation du local storage, condition si : le local storage contient des produits mais le produit n'est pas présent ! 
            if (found == false) {
                productInStorage.push(selectedArticles); // ajout du produit 
                alert (`${parseInt(document.getElementById('quantity').value)} articles ajoutés à votre panier`); 
                localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
            }
        } 
    // Dans initialisation du local storage, condition sinon : le local storage est vide !
        else {
            cart = [ ]; 
            cart.push(selectedArticles); // ajout du produit au tableau
            alert (`${parseInt(document.getElementById('quantity').value)} articles ajoutés à votre panier`); 
            localStorage.setItem('cartStorage', JSON.stringify(cart));
        }
    }
}); 
// --FIN DE LA MISE EN PLACE DU LOCAL STORAGE--. 

