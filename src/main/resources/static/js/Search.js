const auth = "Bearer ya29.a0AVvZVsrEUA5ZNtsX6M3DEBMrs9kTANuhbgX5pqHx53ZlqLsDoVmc-7OUa-tkTHB1zTL93D7_5mRwP4cD-FAqauf4JD7wqaLDBdXMw8O6VyDXAbJMBDZNEwxbqU6mOeNVTGlD3kN9qU95OvSH5rEqBkpj8_lobGe3WgTgxdViaMGrVIWPd-mVLNnjWL27BuVyQrtiK9jfTIu5P3q_V9t4chW0-wkIAq42rO-gbkwfRuTCp40aCgYKAe0SARESFQGbdwaIXXnR6tgSdLsJCugNJa1zVQ0246" 
const url = "https://dialogflow.googleapis.com/v2/projects/newagent-rywr/agent/sessions/d21e6f8f-df75-1fbe-6c6c-c2dfcaae1fd3:detectIntent"
const body = {
    "queryInput":{
        "text":{
            "text":"零食",
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