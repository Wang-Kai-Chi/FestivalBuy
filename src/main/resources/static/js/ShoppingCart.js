import * as sc from "./util/StringCollection.js"
import * as te from "./util/StorageTemp.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"

const elementIds = sc.ShoppingCartIds
const temp = te.temp
let totalMoney = 0

main()

function main() {
    const storage = lsProcessor.load(sc.cartKey)

    if (storage != null) {
        temp.cart = storage

        const cartTable = document.querySelector(elementIds.cbody)
        refreshTable(cartTable, temp.cart.list)

        document.querySelector(elementIds.subtotal).innerHTML = parseInt(totalMoney)
        
        saveOrderInfo()

        setDeleteAllBtnListener()
    }
}

function setDeleteAllBtnListener() {
    document.querySelector(sc.ShoppingCartIds.aldelete).onclick = () => {
        localStorage.removeItem(sc.cartKey)
        document.location.reload()
    }
}

function saveOrderInfo() {
    temp.info.order_total = parseInt(totalMoney)
    temp.cart.info = temp.info
    lsProcessor.save(sc.cartKey, temp.cart)
    console.log(temp.cart)
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
    const cells = tableDataMap()

    for (let i in cells) {
        cells[i] = row.insertCell()
        cells[i].innerHTML = data[i]
    }
}

function getTbody(orderDetail, product) {
    let tbody = tableDataMap()

    tbody.details = `<img src="${product.imageurl}" width="120">` + product.title
    tbody.price = product.price
    tbody.quantity = orderDetail.quantity
    tbody.inStock = product.is_stock
    tbody.changeBtn = `<button class="btn btn-primary" id="${'deleteBtn' + product.product_id}">刪除</button>`

    return tbody
}

function tableDataMap() {
    return {
        details: null,
        price: null,
        quantity: null,
        inStock: null,
        changeBtn: null
    }
}