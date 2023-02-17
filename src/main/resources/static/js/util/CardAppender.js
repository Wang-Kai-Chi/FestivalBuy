const btnPrefix = "gobtn-"
const currentProduct = "current_product"

export function appendProducts(value = [], elementId = "#",range = Array.from(Array(value.length).keys())){
    const products = []

    for (const i of range){
        products.push(value[i])
    }

    for (const i in products) {
        const product = products[i]
        const temp = {
            imageurl: product.imageurl,
            title: product.title,
            price: "$" + product.price,
            id: btnPrefix + product.product_id
        }
        const hotProduct = getCard(temp)

        document.querySelector(elementId).innerHTML += hotProduct
    }

    setBuyBtn(products)
}

const getCard = value => {
    return `<div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${value.imageurl}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${value.title}</h5>
        <h5 class="card-text text-danger">${value.price}</h5>
        <a href="/product_page" class="${value.id} btn btn-primary">購買</a>
        </div>
    </div>
    </div>`
}

const setBuyBtn = products => {
    for (const i in products) {
        const product = products[i]
        document.querySelector("." + btnPrefix + product.product_id).onclick = () => {
            document.cookie = currentProduct + '=' + product.product_id
        }
    }
}