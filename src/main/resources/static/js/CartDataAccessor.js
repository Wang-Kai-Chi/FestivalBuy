import * as lsProcessor from "./util/LocalStorageProcessor.js"

let cart= {
    "customer": {},
    "info": {},
    "list": {}
}

function run(handleCartStorage =()=>{}){
    const storage = lsProcessor.load(sc.cartKey)

    if (storage != null) {
        cart = storage
        handleCartStorage()
    } else {
        if (!alert("你沒有購買任何商品"))
            window.location.href = "/"
    }
}

function getCart(){
    return cart
}