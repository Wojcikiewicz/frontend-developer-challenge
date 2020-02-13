const endpoint = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

function redirect(link) {
    window.location.href = link;
}

async function getProducts(link) {
    let response = await fetch(link);
    if (response.ok){
        let json = await response.json();
        createCards(json.products);
        let button = document.getElementById("more");
        button.onclick = () => getProducts('https://' + json.nextPage);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

function createCards(products) {
    let section = document.createElement("section");
    for (let i = 0; i < 8; i++) {
        let card = createCard(products[i]);
        section.appendChild(card);
    }
    document.getElementById("card-table").appendChild(section);
}

function createCard(product) {
    let card = document.createElement("article");
    let image = document.createElement("figure");
    image.style.backgroundImage = ('url(https:' + product.image + ')');
    card.appendChild(image);
    card.appendChild(generateP(product.name, "name"));
    card.appendChild(generateP(product.description, "description"));
    card.appendChild(generateP("De: R$" + product.oldPrice, "oldPrice"));
    card.appendChild(generateP("Por: R$" + product.price, "price"));
    card.appendChild(generateP('ou ' + product.installments.count + 'x de R$' + product.installments.value + "0",
        "installments"));
    card.appendChild(generateButton("Comprar"));
    return card;
}

function generateButton(text, onClick) {
    let button = document.createElement("button");
    button.onclick = onClick;
    button.innerText = text;
    return button;
}

function generateP(text, className) {
    let p = document.createElement("p");
    p.innerText =  text;
    p.className = className;
    return p;
}