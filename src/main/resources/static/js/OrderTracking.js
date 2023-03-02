import * as cookieParser from "./util/CookieParser.js"
import * as tableRenderer from "./util/TableRenderer.js"

main()

function main() {
    const id = getCustomerId()
    const url = "/api/order_details/customer/" + id
    fetch(url)
        .then(data => data.json())
        .then(jsonData => showData(jsonData))
        .catch((err) => console.log(err))

}

function getCustomerId() {
    const cookie = cookieParser.parseCookie(document.cookie)
    return cookie.customer_id
}

function showData(jsonData) {
    const orderTable = document.querySelector("#tracking-body")

    tableRenderer.refreshTable({
        htmlTable: orderTable,
        getTbody: getOrderTbody,
        getDataMap: orderDataMap,
        "jsonData": jsonData
    })
}

function getOrderTbody(detail, cells = {}) {
    const tbody = cells

    const ckey = detail.orderDetailKey
    const order = ckey.productOrder
    const product = ckey.product

    tbody.orderId = order.order_id
    tbody.date = order.order_date
    tbody.payment = order.payment_method
    tbody.price = product.price
    tbody.img = `<img src="${product.imageurl}" width="120px" alt=""></img>`

    tbody.title = product.title
    tbody.quantity = detail.quantity
    tbody.status = order.status

    return tbody
}

function orderDataMap() {
    return {
        orderId: null,
        date: null,
        payment: null,
        price: null,
        img: null,

        title: null,
        quantity: null,
        status: null
    }
}