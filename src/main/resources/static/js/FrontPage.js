const dollar = "$"
const products = []

function showData(value) {
    products.push(value[1], value[2], value[3])

    for (const i in products) {
        let product = products[i]
        let hotProduct = `<div class="col">
        <div class="card" style="width: 18rem;">
            <img src="${product.imageurl}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${dollar + product.price}</p>
            <button id="${'gobtn-'+i}" class="btn btn-primary">購買</button>
            </div>
        </div>
        </div>`
        document.querySelector("#hot-product").innerHTML += hotProduct
        console.log(i)
        console.log(document.getElementById("gobtn-0"))
    }
}

function saveCookie() {
    console.log("click")
    // document.cookie = `current_product=${products[0].product_id}`
}

window.onload = () => {
    let url = "/api/products"
    fetch(url)
        .then(data => data.json())
        .then(value => showData(value))
}