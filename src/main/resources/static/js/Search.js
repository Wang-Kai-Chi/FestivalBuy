import * as lsProcessor from "./util/LocalStorageProcessor.js"
import * as card from "./util/CardAppender.js"
import * as dfa from "./secret/DialogflowAPI.js"

let searchText
const dialogflowAPI = dfa.obj

main()

function main() {
	searchText = lsProcessor.load("search")
	postSearch(searchText)
}

function postSearch(text = "我要找商品") {
	dialogflowAPI.text = text

	fetch(dialogflowAPI.url, {
		method: "post",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': dialogflowAPI.auth,
			'Keep-Alive': 'timeout=2000'
		},
		body: JSON.stringify(dialogflowAPI.getBody())
	})
		.then(response => response.json())
		.then(jsonData => handleData(jsonData))
		.catch(err => console.log(err))
}

function handleData(jsonData){
	const fulfillmentText = jsonData.queryResult.fulfillmentText
	const value = getParseJson(fulfillmentText)

	renderResult(value)
}

function getParseJson(text) {
	try {
		return JSON.parse(text)
	} catch (err) {
		return text
	}
}

function renderResult(value) {
	if (value.constructor == Array) {
		document.querySelector("#search-title").innerHTML = "這是您搜尋" + searchText + "的結果"
		card.appendProducts(value, "#search-result")
	}
	else if (value.constructor == String)
		document.querySelector("#search-title").innerHTML = value
	else
		document.querySelector("#search-title").innerHTML = "找不到您要的結果，請再搜尋一次"
}