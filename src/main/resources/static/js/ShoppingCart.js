import * as orders from "./Orders.js"

main()

function main() {
    const cartTable = document.getElementById("cart-body")
    const list = orders.list

    refreshTable(cartTable, list)

    showOrderDetail(orders.orderDetail, list)

    setEvenListenerToDeleteBtns(cartTable, list)

    document.getElementById("delete-all").onclick = () => clearCart(list)
}

function refreshTable(table, list) {
    for (let i of list) {
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
        if (table.rows.length < list.length) {
            appendData(table, obj, data)
        }
        else if (table.rows.length > 0) {
            for (const i in table.rows)
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

function showOrderDetail(orderDetail, list) {
    updateOrderDetail(orderDetail, list)

    const component = {
        itemQuantity: document.getElementById("item-quantity"),
        totalQuantity: document.getElementById("total-quantity"),
        subTotal: document.getElementById("sub-total")
    }

    for (let i in orderDetail)
        component[i].innerHTML = orderDetail[i]
}

function clearCart(list) {
    console.log(list)
}

function setEvenListenerToDeleteBtns(table, list) {
    for (let i = 1; i <= table.rows.length; i++) {
        const btn = document.getElementById("deleteBtn" + i)

        btn.onclick = () => {
            for (const j in list) {
                if (list[j].id == i) 
                    console.log(list[j])
            }
        }
    }
}