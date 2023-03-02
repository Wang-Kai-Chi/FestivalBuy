import * as sc from "./util/StringCollection.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"

const elementIds = sc.ShoppingCartIds
let totalMoney = 0

let cart = {
    "customer": {},
    "info": {},
    "list": {}
}

main()

function main() {
    const storage = lsProcessor.load(sc.cartKey)

    if (storage != null) {
        cart = storage
        handleCartStorage()
    } else {
        if (!alert("你沒有購買任何商品"))
            window.location.href = "/"
    }
}

function handleCartStorage() {
    const cartTable = document.querySelector(elementIds.cbody)

    refreshTable(cartTable, cart.list)

    document.querySelector(elementIds.subtotal).innerHTML = parseInt(totalMoney)

    saveOrderInfo()

    setDeleteAllBtnListener()
}

function setDeleteAllBtnListener() {
    document.querySelector(sc.ShoppingCartIds.aldelete).onclick = () => {
        localStorage.removeItem(sc.cartKey)
        document.location.reload()
    }
}

function saveOrderInfo() {
    const info = {
        "order_date": "YYYY-MM-DD hh:mm:ss",
        "order_total": 0,
        "status": "processing",
        "shipping_address": "place",
        "payment_method": "method",
        "recipient_name": "john",
        "recipient_phone": "123"
    }
    
    info.order_total = parseInt(totalMoney)
    cart.info = info
    lsProcessor.save(sc.cartKey, cart)
    console.log(cart)
}

function refreshTable(table, list) {
    for (let i in list) {
        const orderDetail = list[i]

        const data = getTbody(orderDetail, orderDetail.product)
        appendDataToTable(table, data)

        totalMoney += orderDetail.subtotal
    }

}

function appendDataToTable(table, data) {
    const row = table.insertRow()
    const cells = getCartDataMap()

    for (let i in cells) {
        cells[i] = row.insertCell()
        cells[i].innerHTML = data[i]
    }
}

function getTbody(orderDetail, product) {
    let tbody = getCartDataMap()

    tbody.details = `<img src="${product.imageurl}" width="120">` + product.title
    tbody.price = product.price
    tbody.quantity = orderDetail.quantity
    tbody.inStock = product.is_stock
    tbody.changeBtn = `<button class="btn btn-primary" id="${'deleteBtn' + product.product_id}">刪除</button>`

    return tbody
}

function getCartDataMap() {
    return {
        details: null,
        price: null,
        quantity: null,
        inStock: null,
        changeBtn: null
    }
}