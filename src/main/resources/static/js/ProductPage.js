const ids = [
    "#product-name",
    "#product-price",
    "#product-descripion",
    "#product-quantity"
]
let value = document.querySelector(ids[3]).value

document.querySelector(ids[3]).onchange = ()=>{
    saveStorage()
    console.log(product)
}

const product = {
    "name": document.querySelector(ids[0]).innerHTML,
    "price": parsePrice(ids[1]),
    "description": document.querySelector(ids[2]).innerHTML,
    "quantity": value
}

document.querySelector("#add-to-cart").onclick = () => {
    saveStorage()
    console.log(loadStorage())
}

function saveStorage(){
    localStorage.setItem("product", JSON.stringify(product))
}

function loadStorage(){
    let product = localStorage.getItem("product")
    return JSON.parse(product)
}

function parsePrice(id) {
    return document.querySelector(id).innerHTML.substring(1)
}