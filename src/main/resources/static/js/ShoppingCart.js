import * as cartData from "./CartDataAccessor.js"

const ShoppingCartIds = {
    cbody: "#cart-body",
    aldelete: "#delete-all",
    subtotal: "#sub-total"
}
let totalMoney = 0

main()

function main() {
    cartData.run(handleCartStorage)
}

function handleCartStorage() {
    const cartTable = document.querySelector(ShoppingCartIds.cbody)

    refreshTable(cartTable, cartData.getCart().list)

    document.querySelector(ShoppingCartIds.subtotal).innerHTML = parseInt(totalMoney)

    cartData.saveOrderInfo(totalMoney)

    setDeleteAllBtnListener()
}

function setDeleteAllBtnListener() {
    document.querySelector(ShoppingCartIds.aldelete).onclick = () => {
        localStorage.removeItem(cartData.getKey())
        document.location.reload()
    }
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