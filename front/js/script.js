// je récupère les données de l'api via un fetch --> 
fetch ("http://localhost:3000/api/products")
.then (function (response) {
    return response.json ();
})
.then (function (data) {
    console.log (data);
    // let html = ""; 
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const a = document.createElement ("a"); 
        a.setAttribute("href", "./product.html?id="+element._id);
        const article = document.createElement('article');
        a.append(article);
        const img = document.createElement ('img');
        img.setAttribute("src", element.imageUrl);
        img.setAttribute("alt", element.altTxt);
        article.append(img);
        const h3 = document.createElement ('h3'); 
        h3.setAttribute("class","productName"); 
        article.append(h3);
        h3.append(element.name);
        const p = document.createElement ('p'); 
        p.setAttribute("class", "productDescription");  
        article.append(p);
        p.append(element.description); 
        document.getElementById("items").append(a);
    };
})
.catch (function (responseError) {
    console.log ('erreur');
});

