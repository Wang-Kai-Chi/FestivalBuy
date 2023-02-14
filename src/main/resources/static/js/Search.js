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
    .then(jsonData => console.log(jsonData))
    .catch(err =>console.log(err))
}