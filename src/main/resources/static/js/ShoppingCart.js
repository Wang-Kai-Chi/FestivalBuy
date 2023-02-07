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
    }
}

function refreshTable(table, list) {
    for (let i in list) {
        const orderDetail = list[i]
        const product = list[i].product

        let data = getTbody(orderDetail, product)
        const obj = {
            details: null,
            price: null,
            quantity: null,
            inStock: null,
            changeBtn: null
        }
        appendData(table, obj, data)

        totalMoney += orderDetail.subtotal
    }
    document.querySelector(elementIds.subtotal).innerHTML = parseInt(totalMoney)
    saveOrderInfo()
}

function saveOrderInfo(){
    temp.info.order_total = parseInt(totalMoney)
    temp.cart.info = temp.info
    lsProcessor.save(sc.cartKey, temp.cart)
    console.log(temp.cart)
}

function appendData(table, obj, data) {
    const row = table.insertRow()

    for (let i in obj) {
        obj[i] = row.insertCell()
        obj[i].innerHTML = data[i]
    }
}

function getTbody(orderDetail, product) {
    let tbody = {
        details: `<img src="${product.imageurl}" width="120">` + product.title,
        price: product.price,
        quantity: orderDetail.quantity,
        inStock: product.is_stock,
        changeBtn: `<button class="btn btn-primary" id="${'deleteBtn' + product.product_id}">刪除</button>`,
    }

    return tbody
}