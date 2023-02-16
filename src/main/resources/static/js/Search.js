import * as lsProcessor from "./util/LocalStorageProcessor.js"
import * as card from "./util/CardAppender.js"

let searchText

main()

function main() {
    searchText = lsProcessor.load("search")
    postSearch(searchText)
}

function postSearch(text = "我要找商品") {
    const auth = "Bearer ya29.a0AVvZVspn7CR1lGinnAIqxfsrqU0WIcVlgkZLh10H8jhPwQHkcSSF22BKBDMs2iBE6OG5RE5RpNi9U4ft_O9FOtxORHWl3JwNI0fnb1hz5-EkzZQM4BGIJj_QXcoVx6WM9eCXseIpZxb6ksvzrC68qHgUGB_cF3DxiVOVlZqEskainVXs-tncRew9YChf908DZiRJi3mpSJznqv4f9Z_MikXIzFn_V2hTB9zn08MBmAaAeLEaCgYKAU8SARESFQGbdwaIxz2wNLNmkbwFIU8wvVg5cQ0246"
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
        card.appendProducts(value, value.length, "#search-result")
    }
    else if (value.constructor == String)
        document.querySelector("#search-title").innerHTML = value
    else
    document.querySelector("#search-title").innerHTML = "找不到您要的結果，請再搜尋一次"
}