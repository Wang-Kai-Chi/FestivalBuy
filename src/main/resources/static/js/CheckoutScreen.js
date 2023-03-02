import * as sc from "./util/StringCollection.js"
import * as cookieParser from "./util/CookieParser.js"
import * as cartData from "./CartDataAccessor.js"

let orderId = 0

const productOrderBody = {
    "order_id": 3,
    "customer": {
        "customer_id": 1
    },
    "order_date": "2023-01-31 07:51:57",
    "order_total": 5840,
    "status": "處理中",
    "shipping_address": null,
    "payment_method": null,
    "recipient_name": null,
    "recipient_phone": null
}

const orderDetailArray = []

main()

function main() {
    cartData.run(handleCartStorage)
}

function handleCartStorage() {
    console.log(cartData.getCart())
    const form = document.querySelector("form")
    form.addEventListener("submit", handleSubmit)
}

function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const obj = Object.fromEntries(formData.entries())

    setOrderInfo(obj)

    console.log(productOrderBody)

    postData()
}

function setOrderInfo(obj) {
    const cart = cartData.getCart()

    productOrderBody.payment_method = getPayment(obj.payment)
    productOrderBody.order_date = getFullDateString()
    productOrderBody.recipient_name = obj.username
    productOrderBody.recipient_phone = obj.phone

    productOrderBody.order_total = cart.info.order_total
    productOrderBody.shipping_address = obj.address
    productOrderBody.status = "處理中"

    productOrderBody.order_id = orderId
    productOrderBody.customer.customer_id = getCustomerId()
}

function getCustomerId() {
    const cookie = cookieParser.parseCookie(document.cookie)
    return cookie.customer_id
}

function postData() {
    fetch("/api/orders", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Keep-Alive': 'timeout=2000'
        },
        body: JSON.stringify(productOrderBody)
    })
        .then(response => response.json())
        .then(jsonData => {
            orderId = jsonData.order_id
            initOrderDetailArry()
        })
        .then(() => postOrderDetail())
        .catch(err => {
            alert("資料填寫未完成")
            location.href = "/shopping_cart"
        })
}

function postOrderDetail() {
    fetch("/api/order_details", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Keep-Alive': 'timeout=2000'
        },
        body: JSON.stringify(orderDetailArray)
    })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem(sc.cartKey)
            if (!alert("訂單已送出"))
                location.href = "/order_tracking"
        })
        .catch(() => {
            if (!alert("傳送失敗"))
                location.href = "/shopping_cart"
        })
}

function initOrderDetailArry() {
    const plist = cartData.getCart().list

    for (const i in plist) {
        let orderDetailBody = {
            "orderDetailKey": {
                "productOrder": {
                    "order_id": 1
                },
                "product": {
                    "product_id": 1
                }
            },
            "quantity": 1,
            "subtotal": 0.0
        }

        orderDetailBody.orderDetailKey.productOrder.order_id = orderId
        orderDetailBody.orderDetailKey.product.product_id = plist[i].product.product_id
        orderDetailBody.quantity = plist[i].quantity
        orderDetailBody.subtotal = plist[i].subtotal

        orderDetailArray.push(orderDetailBody)
    }
}

function getPayment(value) {
    const payment = ["信用卡線上刷卡", "7-11取貨付款", "悠遊卡", "ATM付款(轉帳/線上繳款)"]
    return payment[parseInt(value) - 1]
}

function getFullDateString() {
    const currentdate = new Date()
    const year = currentdate.getFullYear()
    const month = () => getTwoDigitsNumber(currentdate.getMonth() + 1)
    const date = () => getTwoDigitsNumber(currentdate.getDate())
    const hour = () => getTwoDigitsNumber(currentdate.getHours())
    const minute = () => getTwoDigitsNumber(currentdate.getMinutes())
    const second = () => getTwoDigitsNumber(currentdate.getSeconds())

    return year + "-" + month() + "-" + date() + " "
        + hour() + ":" + minute() + ":" + second()
}

function getTwoDigitsNumber(value) {
    let temp = value
    let result = ""
    if (temp < 10)
        result = "0" + temp
    else
        result = value
    return result
}