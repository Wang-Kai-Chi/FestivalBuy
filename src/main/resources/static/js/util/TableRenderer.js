export function refreshTable(param = {htmlTable:null,getTbody : () => { },getDataMap : () => { },jsonData : []}) {
    for (let i in param.jsonData) {
        const detail = param.jsonData[i]
        const data = param.getTbody(detail, param.getDataMap())

        appendDataToTable({
            "htmlTable": param.htmlTable,
            "cells": param.getDataMap(),
            "data": data
        })
    }
}


function appendDataToTable(param = { htmlTable: null, cells: {}, data: [] }) {
    const row = param.htmlTable.insertRow()

    for (let i in param.cells) {
        const c = param.cells
        c[i] = row.insertCell()
        c[i].innerHTML = param.data[i]
    }
}