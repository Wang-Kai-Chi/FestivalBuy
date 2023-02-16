import * as card from "./util/CardAppender.js"

main()

function main() {
    const url = "/api/products"
    fetch(url)
    .then(data => data.json())
    .then(value => {
        card.appendProducts(value, "#hot-product", [0,1,2])
        card.appendProducts(value, "#gift-box", [15,16,19])
    })
    .catch((err) => console.log(err))
}