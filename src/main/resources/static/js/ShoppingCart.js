import * as orders from "./Orders.js"

const cartTable = document.getElementById("cart-body")

function refreshTable(table, orders) {
    for (let i of orders) {
        const obj = {
            details: null,
            price: null,
            quantity: null,
            inStock: null,
            changeBtn: null
        }
        const data = {
            details: `<img src="${i.pic}" width="120">` + i.name,
            price: i.price,
            quantity: i.quantity,
            inStock: i.inStock,
            changeBtn: `<button id="${'deleteBtn'+i.id}">刪除</button>`,
        }
        if (table.rows.length < orders.length) {
            appendData(table, obj, data)
        }else{
            updateTable(table, data)
        }
    }
}

function appendData(table, obj, data) {
    const row = table.insertRow()

    for (let i in obj){
        obj[i] = row.insertCell()
        obj[i].innerHTML = data[i]
    }
}

function updateOrderDetail(orderDetail, products){
    for (let i of products) {
        orderDetail.itemQuantity++
        orderDetail.totalQuantity += parseInt(i.quantity)
        orderDetail.subTotal += parseInt(i.quantity * i.price)
    }
}

function showOrderDetail(orderDetail) {
    const component = {
        itemQuantity:document.getElementById("item-quantity"),
        totalQuantity:document.getElementById("total-quantity"),
        subTotal:document.getElementById("sub-total")
    }

    for(let i in orderDetail)
        component[i].innerHTML = orderDetail[i]
}

refreshTable(cartTable, orders.list)

updateOrderDetail(orders.orderDetail, orders.list)

showOrderDetail(orders.orderDetail)

setEvenListenerToDeleteBtns()

document.getElementById("delete-all").onclick = clearCart

updateTable(cartTable)

function updateTable(table, data){
    for(let r = 0;r<table.rows.length;r++){
        let row = table.rows[r]
        for(let c = 0;c<row.cells.length;c++){
            let cell = row.cells[c]
            console.log(cell.innerHTML)
        }
    }
}

function clearCart(){
    console.log(orders.list)
    refreshTable(cartTable, orders.list)
}

function setEvenListenerToDeleteBtns(){
    for(let i = 1;i<=cartTable.rows.length;i++){
        const btn = document.getElementById("deleteBtn"+i)

        btn.onclick = ()=>{
            console.log(orders.list[i-1])
            refreshTable(cartTable, orders.list)
        }
    }
}