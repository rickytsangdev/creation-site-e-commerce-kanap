//  Récupération de l'id dans l'URL
const queryParams = window.location.href;

// extraire l'id methode URLsearchParams
var url = new URL(queryParams);
var id = url.searchParams.get("id");

//faire un fetch sur la bonne route 
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
    console.log('Error')
});

// -- Mise en place du panier local storage --

// Ecoute du panier on click
const addToCart = document.getElementById('addToCart'); 
addToCart.addEventListener('click', function() {

    let productInStorage = JSON.parse(localStorage.getItem('cartStorage'));

    let cart = [ ]; // création de l'array panier

    let selectedArticles = {  // création des options utilisateur
        id : id, 
        color : document.getElementById('colors').value, 
        quantity : parseInt(document.getElementById('quantity').value), 
    }; 
    
    alert ('Kanap ajouté au panier !'); 
    
// Condition 1 : si le panier storage n'est pas vide
    if (productInStorage ) {
// Parcours de mon panier pour trouver l'élément id et couleur 
        var found = false; 
        for (let i = 0; i < productInStorage.length; i++) {
            if (productInStorage[i].id == id && productInStorage[i].color == document.getElementById('colors').value) {
                productInStorage[i].quantity += parseInt(document.getElementById('quantity').value);
                localStorage.setItem('cartStorage', JSON.stringify(productInStorage)); 
                found = true;  
            }; 
        }
        if (found == false) {
            productInStorage.push(selectedArticles); 
            localStorage.setItem('cartStorage', JSON.stringify(productInStorage));
        }
    } 

// condition 2 :  si le panier storage est vide 
    else {
        cart = [ ]; 
        cart.push(selectedArticles); 
        localStorage.setItem('cartStorage', JSON.stringify(cart));
    }
}); 

