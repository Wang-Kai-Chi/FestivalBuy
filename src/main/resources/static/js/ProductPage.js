import * as cookieParser from "./ParseCookie.js"
import * as sc from "./StringCollection.js"

let orderDetail = {
    product: {},
    customer: {},
    quantity: null,
    subtotal: null
}

main()

function main() {
    window.onload = () => {
        const cookieObj = cookieParser.parseCookie(document.cookie)

        console.log(cookieObj)

        fetchData(cookieObj)
    }
}

const setOrder = productData => {
    console.log(productData)
    const eQuantity = document.querySelector(sc.productId.quantity)
    eQuantity.value = Math.min(Math.max(eQuantity.min, eQuantity.value), eQuantity.max)
    
    let quantity = eQuantity.value
    
    let subtotal = quantity * productData.price

    orderDetail = {
        product: productData,
        quantity: quantity,
        subtotal: subtotal
    }

    setBuyBtnListener(orderDetail)
}

async function fetchData(cookieObj) {
    let url = "/api/products/" + cookieObj.current_product
    fetch(url)
        .then(data => data.json())
        .then(value => parseValue(value))
        .catch(err => console.log(err))
}

const parseValue = value => {
    document.querySelector(sc.productId.name).innerHTML = value.title
    document.querySelector(sc.productId.price).innerHTML = sc.dollar + value.price
    document.querySelector(sc.productId.descripion).innerHTML = value.description

    document.querySelector(sc.productId.img).src = value.imageurl

    setOrder(value)
    document.querySelector(sc.productId.quantity).onchange = () => {
        setOrder(value)
    }
}

const setBuyBtnListener = order => {
    const btn = document.querySelector(sc.productId.btn)
    btn.onclick = () => {
        btn.classList.toggle('btn-warning')

        btn.innerHTML = "已購買"

        document.querySelector(sc.productId.quantity).remove()
        document.querySelector(".qtext").remove()

        saveStorage(order)
        console.log(loadStorage())
    }
}

const saveStorage = data =>
    localStorage.setItem("order", JSON.stringify(data))

const loadStorage = () => {
    let product = localStorage.getItem("order")
    return JSON.parse(product)
}