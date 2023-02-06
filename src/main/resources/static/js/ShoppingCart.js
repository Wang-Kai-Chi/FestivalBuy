import * as sc from "./StringCollection.js"
import * as te from "./StorageTemp.js"
import * as lsProcessor from "./LocalStorageProcessor.js"

const elementIds = sc.ShoppingCartIds
const temp = te.temp
let totalMoney = 0

main()

function main() {
    const storage = lsProcessor.load(sc.ordersKey)

    if (storage != null) {
        temp.orders = storage
        
        const cartTable = document.querySelector(elementIds.cbody)
        refreshTable(cartTable, temp.orders.list)
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
}

function appendData(table, obj, data) {
    const row = table.insertRow()

    for (let i in obj) {
        obj[i] = row.insertCell()
        obj[i].innerHTML = data[i]
        console.log(obj[i])
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