import * as sc from "./util/StringCollection.js"

main()

function main(){
    const text = "生鮮"
    postSearch(text)
}

function postSearch(text = "我要找商品"){
    const auth = "Bearer ya29.a0AVvZVsqIRYgEYMLtAcFPiylno80A5wmyTdVDfGyDY5FjQQzWVAu0WYjBNJy1MVUHasyfoP9TAAe3giYJMxxF26VX0PW59wDBmOYe6N00hgywFPrI2my_Ja5uD1XMl455AjqHzwoBIjiRypg0LpVEy3YJYTVVwlZ05YGlUYFgtdAt4Xq_SD-mpc2zBlNfLsD1lPHwOSIugVdIu-mu2k-ouc8LcoKCo6igRermlV6TmdDyS8oaCgYKAckSARESFQGbdwaIBdijeWqquoAh61RQEXl0tA0246" 
    const url = "https://dialogflow.googleapis.com/v2/projects/newagent-rywr/agent/sessions/d21e6f8f-df75-1fbe-6c6c-c2dfcaae1fd3:detectIntent"
    const body = {
        "queryInput":{
            "text":{
                "text":text,
                "languageCode":"zh-tw"
            }
        },
        "queryParams":{
            "source":"DIALOGFLOW_CONSOLE",
            "timeZone":"Asia/Taipei",
            "sentimentAnalysisRequestConfig":{
                "analyzeQueryTextSentiment":true
            }
        }
    }
    fetch(url, {
        method:"post",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': auth,
            'Keep-Alive': 'timeout=2000'
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
    .then(jsonData => {
        console.log(jsonData)
        const value = JSON.parse(jsonData.queryResult.fulfillmentText)
        showData(value)
    })
    .catch(err =>console.log(err))
}
const showData = (value) => {
    const products = []

    for(let i = 0;i<3;i++)
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