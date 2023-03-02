import * as lsProcessor from "./util/LocalStorageProcessor.js"

let cart = {
    "customer": {},
    "info": {},
    "list": {}
}
const key = "cart"

export function run(handleCartStorage = () => { }) {
    const storage = lsProcessor.load(key)

    if (storage != null) {
        cart = storage
        handleCartStorage()
    } else {
        if (!alert("你沒有購買任何商品"))
            window.location.href = "/"
    }
}

export function loadStorageToCart() {
    const storage = lsProcessor.load(key)
    if (storage != null)
        cart = storage
}

export function getCart() {
    return cart
}

export function getKey(){
    return key
}