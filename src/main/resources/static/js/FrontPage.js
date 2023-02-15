import * as sc from "./util/StringCollection.js"

main()

function main() {
    const url = "/api/products"
    fetch(url)
    .then(data => data.json())
    .then(value => showData(value))
    .catch((err) => console.log(err))
    
}

const showData = (value) => {
    const products = []

    for(let i = 0;i<3;i++)
        products.push(value[i])

    for (const i in products) {
        const product = products[i]
        const temp = {
            imageurl: product.imageurl,
            title: product.title,
            price: sc.dollar + product.price,
            id: sc.btnPrefix + i
        }
        const hotProduct = getCard(temp)

        document.querySelector("#hot-product").innerHTML += hotProduct
    }

    setBtnListener(products)
}

const getCard = temp => {
    return `<div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${temp.imageurl}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${temp.title}</h5>
        <p class="card-text">${temp.price}</p>
        <a href="/product_page" class="${temp.id} btn btn-primary">購買</a>
        </div>
    </div>
    </div>`
}

const setBtnListener = products => {
    for (const i in products) {
        document.querySelector("." + sc.btnPrefix + i).onclick = () => {
            const product = products[i]
            document.cookie = sc.currentProduct + '=' + product.product_id
        }
    }
}