export const obj = {
	auth: "Bearer ya29.a0AVvZVsoebLqtbNfkx4GtQqmuaZhPZACCJ8WZf1xJdo5uJVvRrEr8QMXVJqZRvF6qgAbF8m3L4cGqEuOexHApSgQZfMFAFT79jT1n2Im_C1urpHuDztzSZ1lr2ndFUzLFvsB9jwkmxfnqRPlOW0lBouybawj_e8vzB4oEbrU0NW8f4gQB8qOaKXC98jL5fN1QUsrBYRcNRQ5SWsPPjHP5LmbmWBGvU1voPqmC9sTwyvbGuQaCgYKAXgSARESFQGbdwaIUyoAOHEXzhXBjLbqzYIghg0245",
	url: "https://dialogflow.googleapis.com/v2/projects/newagent-rywr/agent/sessions/4d4d745b-8c95-3ae3-dccc-3f3c02fba1e8:detectIntent",
	text: "",
	getBody: function() {
		return {
			"queryInput": {
				"text": {
					"text": this.text,
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
	}
}