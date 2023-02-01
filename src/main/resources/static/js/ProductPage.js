const ids = [
    "#product-name",
    "#product-price",
    "#product-descripion",
    "#product-img",
    "#product-quantity"
]
const product = {
    "product_id": null,
    "title": null,
    "price": null,
    "category_id": null,
    "imageurl": null,
    "description": null,
    "is_stock": null
}
const dollar = "$"

document.querySelector("#add-to-cart").onclick = () => {
    saveStorage(product)
    console.log(loadStorage())
}

window.onload = ()=>{
    let url = "/api/products/2"
    fetch(url)
            .then(data => data.json())
            .then(value => showData(value))
    console.log(document.cookie)
}

function showData(value){
    for(const i in product){
        product[i] = value[i]
    }

    document.querySelector(ids[0]).innerHTML = product.title
    document.querySelector(ids[1]).innerHTML = dollar+product.price
    document.querySelector(ids[2]).innerHTML = product.description

    document.querySelector(ids[3]).src = product.imageurl
    document.querySelector(ids[4]).value = 0
}

function saveStorage(data){
    localStorage.setItem("product", JSON.stringify(data))
}

function loadStorage(){
    let product = localStorage.getItem("product")
    return JSON.parse(product)
}

function parsePrice(id) {
    return document.querySelector(id).innerHTML.substring(1)
}

