import * as lsProcessor from "../util/LocalStorageProcessor.js"

export function getObj() {
	let cart = {
		"customer": {},
		"info": {},
		"list": {}
	}
	const key = "cart"

	return {
		run:
			function(handleCartStorage = () => { }) {
				const storage = lsProcessor.load(key)

				if (storage != null) {
					cart = storage
					handleCartStorage()
				} else {
					if (!alert("你沒有購買任何商品"))
						window.location.href = "/"
				}
			},
		loadStorageToCart:
			function() {
				const storage = lsProcessor.load(key)
				if (storage != null)
					cart = storage
			},
		getCart:
			function() {
				return cart
			},
		getKey:
			function() {
				return key
			},
		saveOrderInfo:
			function(totalMoney = 0) {
				const info = {
					"order_date": "YYYY-MM-DD hh:mm:ss",
					"order_total": 0,
					"status": "processing",
					"shipping_address": "place",
					"payment_method": "method",
					"recipient_name": "john",
					"recipient_phone": "123"
				}

				info.order_total = parseInt(totalMoney)

				cart.info = info
				lsProcessor.save(key, cart)
			},
		saveCart:
			function(cart) {
				lsProcessor.save(key, cart)
			}
	}
}