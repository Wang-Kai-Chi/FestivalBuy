import * as te from "./util/StorageTemp.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"
import * as sc from "./util/StringCollection.js"

const temp = te.temp
let storage

const postBody = {
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

main()

function main() {
    storage = lsProcessor.load(sc.cartKey)

    if (storage != null) {
        temp.cart = storage

        const form = document.querySelector("form")
        form.addEventListener("submit", handleSubmit)
    }
}

function handleSubmit(event) {
    //event.preventDefault()

    const formData = new FormData(event.target)
    const obj = Object.fromEntries(formData.entries())

    setOrderInfo(obj)

    postData()
}

function postData() {
    fetch("/api/orders", {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    })
        .then(data => data.json())
        .then(value => console.log(value))
        .catch(err => console.log(err))
}

function setOrderInfo(obj) {
    const storage = lsProcessor.load(sc.cartKey)

    postBody.payment_method = getPayment(obj.payment)
    postBody.order_date = getFullDateString()
    postBody.recipient_name = obj.username
    postBody.recipient_phone = obj.phone

    postBody.order_total = storage.info.order_total
    postBody.shipping_address = obj.address
    postBody.status = "處理中"

    postBody.order_id = 0
    postBody.customer.customer_id = 1

    console.log(postBody)
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