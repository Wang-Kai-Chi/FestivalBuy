const dollar = "$"
const products = []

main()

function main() {
    window.onload = () => {
        let url = "/api/products"
        fetch(url)
            .then(data => data.json())
            .then(value => showData(value))
            .catch(() => console.log("fetch fail"))
    }
}

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
            <a class="${'gobtn-' + i} btn btn-primary">購買</a>
            </div>
        </div>
        </div>`
        document.querySelector("#hot-product").innerHTML += hotProduct
    }

    setBtnListener()
}

function setBtnListener() {
    document.querySelector(".gobtn-0").onclick = () => {
        console.log("click")
    }
    document.querySelector(".gobtn-1").onclick = () => {
        console.log("click")
    }
    document.querySelector(".gobtn-2").onclick = () => {
        console.log("click")
    }
}