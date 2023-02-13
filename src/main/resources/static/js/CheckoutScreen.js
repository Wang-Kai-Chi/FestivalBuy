import * as te from "./util/StorageTemp.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"
import * as sc from "./util/StringCollection.js"

const storageTemp = te.temp
let storage
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
    storage = lsProcessor.load(sc.cartKey)

    if (storage != null) {
        storageTemp.cart = storage

        const form = document.querySelector("form")
        form.addEventListener("submit", handleSubmit)
    }
}

function handleSubmit(event) {
    const formData = new FormData(event.target)
    const obj = Object.fromEntries(formData.entries())

    setOrderInfo(obj)

    handlePost(event)
}

function handlePost(event){
    let isPostAllow = true
    
    for (const i in productOrderBody) {
        if (productOrderBody[i] == null)
            isPostAllow = false
    }
    
    if (isPostAllow)
        postData()
    else {
        event.preventDefault()
        alert("資料填寫未完成")
    }
}

function setOrderInfo(obj) {
    const storage = lsProcessor.load(sc.cartKey)

    productOrderBody.payment_method = getPayment(obj.payment)
    productOrderBody.order_date = getFullDateString()
    productOrderBody.recipient_name = obj.username
    productOrderBody.recipient_phone = obj.phone

    productOrderBody.order_total = storage.info.order_total
    productOrderBody.shipping_address = obj.address
    productOrderBody.status = "處理中"

    productOrderBody.order_id = orderId
    productOrderBody.customer.customer_id = 1

}

function postData(){
    fetch("/api/orders", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productOrderBody)
    })
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData)
            orderId = jsonData.order_id
            initOrderDetailArry()
        })
        .then(postOrderDetail)
        .catch(err => console.log(err))
}

function postOrderDetail() {
    fetch("/api/order_details", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetailArray)
    })
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData)
            localStorage.removeItem(sc.cartKey)
            if (!alert("訂單已送出"))
                window.location.href = "/"
        })
        .catch(err => alert(err))
}

function initOrderDetailArry() {
    const plist = storageTemp.cart.list
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
    return payment[parseInt(value)-1]
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