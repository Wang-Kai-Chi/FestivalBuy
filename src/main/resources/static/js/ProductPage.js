import * as cok from "./util/CookieLoader.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"
import * as cartData from "./CartDataAccessor.js"

const productPageIds = {
    name: "#pname",
    price: "#pprice",
    descripion: "#pdescripion",
    img: "#pimg",
    quantity: "#pquantity",
    btn: "#gobtn-cart"
}

main()

function main() {
    window.onload = () => {
        cartData.loadStorageToCart()
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

    document.querySelector(productPageIds.quantity).onchange = () => {
        setOrder(value)
    }
}

const renderPage = (value) => {
    document.querySelector(productPageIds.name).innerHTML = value.title
    document.querySelector(productPageIds.price).innerHTML = "$" + value.price
    document.querySelector(productPageIds.descripion).innerHTML = value.description

    document.querySelector(productPageIds.img).src = value.imageurl
}

const setOrder = productData => {
    const quantity = getProductQuantity()
    const orderDetail = {
        product: productData,
        quantity: quantity,
        subtotal: quantity * productData.price
    }
    const cart = cartData.getCart()

    saveOrderDetailToOrders(cart, orderDetail)
    setBuyBtnListener(cart)
}

const saveOrderDetailToOrders = (cart, orderDetail) => {
    let productId = orderDetail.product.product_id
    cart.list[`${productId}`] = orderDetail
}

const getProductQuantity = () => {
    const eQuantity = document.querySelector(productPageIds.quantity)
    eQuantity.value = Math.min(Math.max(eQuantity.min, eQuantity.value), eQuantity.max)
    return eQuantity.value
}

const setBuyBtnListener = data => {
    const btn = document.querySelector(productPageIds.btn)
    btn.onclick = () => buyProduct(data)
}

function buyProduct(data) {
    if (cok.isLogin())
        removeBtnAndInput(data)
}

function removeBtnAndInput(data) {
    lsProcessor.save(cartData.getKey(), data)
    document.querySelector("#buy-place").innerHTML = `<button type="button" 
    class="btn btn-warning btn-lg px-4 me-md-2">已購買</button>`

    document.querySelector(productPageIds.quantity).remove()
    document.querySelector(".qtext").remove()

    document.querySelector("#gobtn-cart").remove()
}