import * as cookie from "./ParseCookie.js"
import * as sc from "./StringCollection.js"

main()

function main() {
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
    const product = value

    document.querySelector(sc.productId.name).innerHTML = product.title
    document.querySelector(sc.productId.price).innerHTML = sc.dollar + product.price
    document.querySelector(sc.productId.descripion).innerHTML = product.description

    document.querySelector(sc.productId.img).src = product.imageurl
    document.querySelector(sc.productId.quantity).value = 0

    document.querySelector(sc.productId.btn).onclick = () => {
        saveStorage(value)
        console.log(loadStorage())
    }
}

const saveStorage = data =>
    localStorage.setItem("product", JSON.stringify(data))

const loadStorage = () => {
    let product = localStorage.getItem("product")
    return JSON.parse(product)
}