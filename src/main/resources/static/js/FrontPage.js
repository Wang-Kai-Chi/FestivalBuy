const dollar = "$"
const products = []

main()

function main() {
    window.onload = () => {
        let url = "/api/products"
        fetch(url)
            .then(data => data.json())
            .then(value => showData(value))
            .catch((err) => console.log(err))
    }
}

const showData = value => {
    products.push(value[1], value[2], value[3])

    for (const i in products) {
        let product = products[i]
        const temp = {
            imageurl: product.imageurl,
            title: product.title,
            price: dollar + product.price,
            id: 'gobtn-' + i
        }
        let hotProduct = getCard(temp)

        document.querySelector("#hot-product").innerHTML += hotProduct
    }

    setBtnListener()
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

const setBtnListener = () => {
    for (const i in products) {
        document.querySelector(".gobtn-" + i).onclick = () => {
            let product = products[i]
            document.cookie = `current_product=${product.product_id}`
        }
    }
}