import * as orders from "./Orders.js"

const cartTable = document.getElementById("cart-body")

function refreshTable(table, orders) {
    for (let i of orders) {
        let info = i
        let data = {
            details: `<img src="${info.pic}" width="120">` + info.name,
            price: info.price,
            quantity: info.quantity,
            inStock: info.inStock,
            changeBtn: `<button class="btn btn-primary" id="${'deleteBtn' + info.id}">刪除</button>`,
        }
        const obj = {
            details: null,
            price: null,
            quantity: null,
            inStock: null,
            changeBtn: null
        }
        if (table.rows.length < orders.length) {
            appendData(table, obj, data)
        }
        else if(table.rows.length > 0){
            for(const i in table.rows)
                table.deleteRow(i)
                
            appendData(table, obj, data)
        }
    }
}

function appendData(table, obj, data) {
    const row = table.insertRow()

    for (let i in obj) {
        obj[i] = row.insertCell()
        obj[i].innerHTML = data[i]
    }
}

function updateOrderDetail(orderDetail, products) {
    for (let i of products) {
        orderDetail.itemQuantity++
        orderDetail.totalQuantity += parseInt(i.quantity)
        orderDetail.subTotal += parseInt(i.quantity * i.price)
    }
}

function showOrderDetail(orderDetail) {
    updateOrderDetail(orders.orderDetail, orders.list)

    const component = {
        itemQuantity: document.getElementById("item-quantity"),
        totalQuantity: document.getElementById("total-quantity"),
        subTotal: document.getElementById("sub-total")
    }

    for (let i in orderDetail)
        component[i].innerHTML = orderDetail[i]
}

refreshTable(cartTable, orders.list)

showOrderDetail(orders.orderDetail)

setEvenListenerToDeleteBtns()

document.getElementById("delete-all").onclick = clearCart

function updateTable(table, data) {
    for (const element of table.rows) {
        let row = element
        for (const element of row.cells) {
            let cell = element
            console.log(cell.innerHTML)
        }
    }
}

function clearCart() {
    console.log(orders.list)
}

function setEvenListenerToDeleteBtns() {
    for (let i = 1; i <= cartTable.rows.length; i++) {
        const btn = document.getElementById("deleteBtn" + i)

        btn.onclick = () => {
            for (const j in orders.list) {
                if (orders.list[j].id == i){
                    console.log(orders.list[j])
                }
            }
        }
    }
}