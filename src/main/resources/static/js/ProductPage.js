import * as cookie from "./ParseCookie.js"

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

main()

function main() {
    document.querySelector("#add-to-cart").onclick = () => {
        saveStorage(product)
        console.log(loadStorage())
    }

    window.onload = () => {
        const cookieObj = cookie.parseCookie(document.cookie)

        console.log(cookieObj)

        let url = "/api/products/" + cookieObj.current_product
        fetch(url)
            .then(data => data.json())
            .then(value => showData(value))
    }
}

const showData = value => {
    for (const i in product) {
        product[i] = value[i]
    }

    document.querySelector(ids[0]).innerHTML = product.title
    document.querySelector(ids[1]).innerHTML = dollar + product.price
    document.querySelector(ids[2]).innerHTML = product.description

    document.querySelector(ids[3]).src = product.imageurl
    document.querySelector(ids[4]).value = 0
}

const saveStorage = data => {
    localStorage.setItem("product", JSON.stringify(data))
}

const loadStorage = () => {
    let product = localStorage.getItem("product")
    return JSON.parse(product)
}

const parsePrice = id => {
    return document.querySelector(id).innerHTML.substring(1)
}

