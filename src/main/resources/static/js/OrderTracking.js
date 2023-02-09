
main()

function main() {
    const url = "/api/order_details/customer/1"
    fetch(url)
        .then(data => data.json())
        .then(jsonData => showData(jsonData))
        .catch((err) => console.log(err))

}

function showData(jsonData) {
    const orderTable = document.querySelector("#tracking-body")
    refreshTable(orderTable, jsonData)

}

function refreshTable(table, jsonData) {
    for (let i in jsonData) {
        const detail = jsonData[i]

        const data = getOrderTbody(detail)
        appendDataToTable(table, data)
    }
}


function appendDataToTable(table, data) {
    const row = table.insertRow()
    const cells = orderDataMap()

    for (let i in cells) {
        cells[i] = row.insertCell()
        cells[i].innerHTML = data[i]
    }
}

function getOrderTbody(detail) {
    const tbody = orderDataMap()

    const ckey = detail.orderDetailKey
    const order = ckey.productOrder
    const product = ckey.product

    tbody.orderId = order.order_id
    tbody.date = order.order_date
    tbody.payment = order.payment_method
    tbody.price = product.price
    tbody.img = `<img src="${product.imageurl}" width="120px" alt=""></img>`

    tbody.title = product.title
    tbody.quantity = detail.quantity
    tbody.status = order.status

    return tbody
}

function orderDataMap() {
    return {
        orderId: null,
        date: null,
        payment: null,
        price: null,
        img: null,

        title: null,
        quantity: null,
        status: null
    }
}