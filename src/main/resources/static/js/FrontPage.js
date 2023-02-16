import * as card from "./util/CardAppender.js"

main()

function main() {
    const url = "/api/products"
    fetch(url)
    .then(data => data.json())
    .then(value => card.appendProducts(value, 3, "#hot-product"))
    .catch((err) => console.log(err))
}