import * as lsProcessor from "./util/LocalStorageProcessor.js"
import * as card from "./util/CardAppender.js"

let searchText

main()

function main() {
    searchText = lsProcessor.load("search")
    postSearch(searchText)
}

function postSearch(text = "我要找商品") {
    const auth = "Bearer ya29.a0AVvZVsp-zmaFUxi5JgNqwPLIJ_JePhPeJbghG7u_KcWFUhVnkhAMhQtiFkmpf6DPFzS2wax7arlNbkVXD4iZy8g-HNjrCwXkX0GyRg8bf4Hc8zsp0WB1DaotGJAlll-aOpPiyYq6lNlxyVxzkc4fEZebvCMyASkR1JoyqDiRuMckoWJjeoyzK582ZzQgBxYSATzqKtn_l9qrLAgNCgT2QTIs10qYidTYh8ClFeARGFE9BwaCgYKAdISARESFQGbdwaIkNVzfGYFy1FSmCn3YfLKFg0245"
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
        card.appendProducts(value, "#search-result")
    }
    else if (value.constructor == String)
        document.querySelector("#search-title").innerHTML = value
    else
    document.querySelector("#search-title").innerHTML = "找不到您要的結果，請再搜尋一次"
}