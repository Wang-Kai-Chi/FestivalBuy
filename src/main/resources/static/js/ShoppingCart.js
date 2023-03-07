import * as cda from "./cart/CartDataAccessor.js"
import * as tableRenderer from "./util/TableRenderer.js"

const cartData = cda.getObj()

const ShoppingCartIds = {
    cbody: "#cart-body",
    deleteAll: "#delete-all",
    subtotal: "#sub-total"
}
let totalMoney = 0

main()

function main() {
    cartData.run(handleCartStorage)
}

function handleCartStorage() {
    const cartTable = document.querySelector(ShoppingCartIds.cbody)

	tableRenderer.refreshTable(
		{
			htmlTable: cartTable,
			getTbody: getTbody,
			getDataMap: getCartDataMap,
			jsonData: cartData.getCart().list
		}
	)

    document.querySelector(ShoppingCartIds.subtotal).innerHTML = parseInt(totalMoney)

    cartData.saveOrderInfo(totalMoney)

    setDeleteAllBtnListener()
}

function setDeleteAllBtnListener() {
    document.querySelector(ShoppingCartIds.deleteAll).onclick = () => {
        localStorage.removeItem(cartData.getKey())
        document.location.reload()
    }
}

function getTbody(orderDetail, cells = {}) {
    let tbody = cells
    const product = orderDetail.product

    tbody.details = `<img src="${product.imageurl}" width="120">` + product.title
    tbody.price = product.price
    tbody.quantity = orderDetail.quantity
    tbody.inStock = product.is_stock
    tbody.changeBtn = `<button class="btn btn-primary" id="${'deleteBtn' + product.product_id}">刪除</button>`

    return tbody
}

function getCartDataMap() {
    return {
        details: null,
        price: null,
        quantity: null,
        inStock: null,
        changeBtn: null
    }
}