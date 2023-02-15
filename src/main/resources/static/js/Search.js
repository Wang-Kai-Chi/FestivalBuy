import * as sc from "./util/StringCollection.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"


let searchText

main()

function main() {
    searchText = lsProcessor.load("search")
    postSearch(searchText)
}

function postSearch(text = "我要找商品") {
    const auth = "Bearer ya29.a0AVvZVspa_BshJnU3gjGiD2rMJQs0jkWFReupJv5zwgCiXlS0J6eqLDr4zAWQytFmgWVMpKuBcDE33B7om9Rf_J1JPLqpuV7v5OC3oHGMnEJKwYCDymkPLYZUEk6QdURqTIucM6T7FxRzxcxRYYg7Eap0H49EUAStKXjU7ioWjdtWFGzkpCzhCfD_XQTQvEIUvRy2B-rvNezZwvY44T8lbK1Gq7kXXq7QPT1LwzaYV0tG1DsaCgYKAfQSARESFQGbdwaI_oZ-1nBWzNpJ9InMlWU7hw0246"
    const url = "https://dialogflow.googleapis.com/v2/projects/newagent-rywr/agent/sessions/d21e6f8f-df75-1fbe-6c6c-c2dfcaae1fd3:detectIntent"
    const body = {
        "queryInput": {
            "text": {
                "text": text,
                "languageCode": "zh-tw"
            }
        },
        "queryParams": {
            "source": "DIALOGFLOW_CONSOLE",
            "timeZone": "Asia/Taipei",
            "sentimentAnalysisRequestConfig": {
                "analyzeQueryTextSentiment": true
            }
        }
    }
    fetch(url, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
            'Keep-Alive': 'timeout=2000'
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(jsonData => {
            const fulfillmentText = jsonData.queryResult.fulfillmentText
            console.log(fulfillmentText)

            const value = getParseJson(fulfillmentText)
            console.log(value)

            renderResult(value)
        })
        .catch(err => console.log(err))
}

function getParseJson(text) {
    try {
        return JSON.parse(text)
    } catch (err) {
        return text
    }
}

function renderResult(value) {
    if (value.constructor == Array){
        document.querySelector("#search-title").innerHTML = "這是您搜尋"+searchText+"的結果"
        showData(value)
    }
    else if (value.constructor == String)
        document.querySelector("#search-title").innerHTML = value
    else
    document.querySelector("#search-title").innerHTML = "找不到您要的結果，請再搜尋一次"
}

const showData = (value) => {
    const products = []

    for (const i in value)
        products.push(value[i])

    for (const i in products) {
        const product = products[i]
        const temp = {
            imageurl: product.imageurl,
            title: product.title,
            price: sc.dollar + product.price,
            id: sc.btnPrefix + i
        }
        const card = getCard(temp)

        document.querySelector("#search-result").innerHTML += card
    }

    setBtnListener(products)
}

const getCard = temp => {
    return `<div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${temp.imageurl}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${temp.title}</h5>
        <p class="card-text">${temp.price}</p>
        <a href="/product_page" class="${temp.id} btn btn-primary">購買</a>
        </div>
    </div>
    </div>`
}

const setBtnListener = products => {
    for (const i in products) {
        document.querySelector("." + sc.btnPrefix + i).onclick = () => {
            const product = products[i]
            document.cookie = sc.currentProduct + '=' + product.product_id
        }
    }
}