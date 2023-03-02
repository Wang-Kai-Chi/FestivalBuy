import * as cok from "./util/CookieLoader.js"
import * as sc from "./util/StringCollection.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"

const elementIds = sc.productPageIds

let cart= {
    "customer": {},
    "info": {},
    "list": {}
}

main()

function main() {
    window.onload = () => {
        const storage = lsProcessor.load(sc.cartKey)

        if (storage != null) {
            cart = storage
        }
        fetchData()
    }
}

async function fetchData() {
    let url = "/api/products/"+cok.current_product()
    fetch(url)
        .then(data => data.json())
        .then(value => parseValue(value))
        .catch(err => console.log(err))
}

const parseValue = value => {
    renderPage(value)

    setOrder(value)

    document.querySelector(elementIds.quantity).onchange = () => {
        setOrder(value)
    }
}

const renderPage = (value) => {
    document.querySelector(elementIds.name).innerHTML = value.title
    document.querySelector(elementIds.price).innerHTML = sc.dollar + value.price
    document.querySelector(elementIds.descripion).innerHTML = value.description

    document.querySelector(elementIds.img).src = value.imageurl
}

const setOrder = productData => {
    const quantity = getProductQuantity()

    const orderDetail = {
        product: productData,
        quantity: quantity,
        subtotal: quantity * productData.price
    }

    saveOrderDetailToOrders(cart, orderDetail)

    setBuyBtnListener(cart)
}

const saveOrderDetailToOrders = (cart, orderDetail) => {
    let productId = orderDetail.product.product_id
    cart.list[`${productId}`] = orderDetail
}

const getProductQuantity = () => {
    const eQuantity = document.querySelector(elementIds.quantity)
    eQuantity.value = Math.min(Math.max(eQuantity.min, eQuantity.value), eQuantity.max)
    return eQuantity.value
}

const setBuyBtnListener = data => {
    const btn = document.querySelector(elementIds.btn)
    btn.onclick = () => buyProduct(data)
}

function buyProduct(data) {
    if (cok.isLogin())
        removeBtnAndInput(data)
}

function removeBtnAndInput(data) {
    lsProcessor.save(sc.cartKey, data)
    document.querySelector("#buy-place").innerHTML = `<button type="button" 
    class="btn btn-warning btn-lg px-4 me-md-2">已購買</button>`

    document.querySelector(elementIds.quantity).remove()
    document.querySelector(".qtext").remove()

    document.querySelector("#gobtn-cart").remove()
}