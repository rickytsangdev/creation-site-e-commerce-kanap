// Récupération de l'id dans l'URL 
const queryParams = window.location.href;

// extraction de l'orderId
const url = new URL(queryParams); 
const  orderId = url.searchParams.get ('orderId'); 

// insertion de l'orderId dans la page 
const orderValidated = document.getElementById ('orderId'); 
orderValidated.innerHTML = orderId; 

