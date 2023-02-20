import * as cookieParser from "./util/CookieParser.js"
import * as lsProcessor from "./util/LocalStorageProcessor.js"

main()

function main() {
	getHeader()
}

async function getHeader() {
	fetch("./header")
		.then(response => response.text())
		.then(data => {
			const header = document.querySelector("header")
			header.classList.add('p-2')
			header.classList.add('text-bg-dark')
			document.querySelector("header").innerHTML = data
			checkLoginState()
			const searchBtn = document.querySelector("#search-submit")
			searchBtn.onclick = handleSearch
		})
}

function handleSearch() {
	const value = document.querySelector("#search-input").value
	lsProcessor.save("search", value)
	location.href = "/search_result"
}

function checkLoginState() {
	const userCookie = document.cookie

	if (userCookie != "") {
		const cookie = cookieParser.parseCookie(userCookie)
		console.log(cookie)

		if (cookie.customer_id != null) {
			document.querySelector("#header-user-action").innerHTML = ""
			document.querySelector(".nav").innerHTML = userDropDown(cookie.full_name)+cartLink

			console.log(document.querySelector("#header-user-action").innerHTML)

			document.querySelector("#logout-btn").onclick = () => handleLogout(userCookie)

			setTouchDropDown()
		}
	}
}

function setTouchDropDown() {
	const menu = document.querySelector(".dropdown-menu")

	document.querySelector(".dropdown").onmouseenter =
		() => menu.classList.add('show')

	document.querySelector(".dropdown").onmouseleave =
		() => menu.classList.remove('show')
}

const userDropDown = (name) => {
	return `<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle text-light" href="#" id="user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">歡迎光臨! ${name}</a>
    <div class="dropdown-menu" aria-labelledby="dropdown01">
      <a class="dropdown-item" href="/shopping_cart">購物車</a>
      <a class="dropdown-item" href="/order_tracking">訂單查詢</a>
      <hr>
      <a class="dropdown-item text-danger" href="/" id="logout-btn">登出</a>
    </div>
  </li>`
}

const cartLink = `<li><a href="/shopping_cart" class="nav-link px-2 text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cart" viewBox="0 0 24 24">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></a></li>`

function handleLogout(userCookie) {
	localStorage.clear()
	cookieParser.deleteAllCookies(userCookie)
	location.href = "/"
}