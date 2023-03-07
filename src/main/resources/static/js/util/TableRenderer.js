export function refreshTable(param = {
	htmlTable: null,
	getTbody: () => { },
	getDataMap: () => { },
	jsonData: []
}) {
	for (let i in param.jsonData) {
		const jd = param.jsonData[i]
		const map = param.getDataMap()
		const data = param.getTbody(jd, map)

		appendDataToTable({
			"htmlTable": param.htmlTable,
			"cells": map,
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