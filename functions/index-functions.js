const endpoint = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

async function getProducts(link) {
    const response = await fetch(link);
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
    let card;
    for (const product of products) {
        card = createCard(product);
        section.appendChild(card);
    }
    document.getElementById("card-table").appendChild(section);
}

function createCard(product) {
    const card = document.createElement("article");
    const image = document.createElement("figure");
    image.style.backgroundImage = ('url(https:' + product.image + ')');
    card.appendChild(image);
    card.appendChild(generateP(product.name, "name"));
    card.appendChild(generateP(product.description, "description"));
    card.appendChild(generateP("De: R$" + product.oldPrice.toFixed(2), "oldPrice"));
    card.appendChild(generateP("Por: R$" + product.price.toFixed(2), "price"));
    card.appendChild(generateP('ou ' + product.installments.count + 'x de R$' +
        product.installments.value.toFixed(2), "installments"));
    card.appendChild(generateButton("Comprar"));
    return card;
}

function generateButton(text, onClick) {
    const button = document.createElement("button");
    button.onclick = onClick;
    button.innerText = text;
    return button;
}

function generateP(text, className) {
    const p = document.createElement("p");
    p.innerText =  text;
    p.className = className;
    return p;
}