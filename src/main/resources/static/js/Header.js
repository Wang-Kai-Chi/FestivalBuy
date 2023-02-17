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
            document.querySelector(".nav").innerHTML = userDropDown(cookie.full_name)

            console.log(document.querySelector("#header-user-action").innerHTML)

            document.querySelector("#logout-btn").onclick = () => handleLogout(userCookie)

            document.querySelector("#user-dropdown").onclick = () => {
                const menu = document.querySelector(".dropdown-menu")

                if (menu.classList.contains('show'))
                    menu.classList.remove('show')
                else
                    menu.classList.add('show')
            }
        }
    }
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

function handleLogout(userCookie) {
    localStorage.clear()
    cookieParser.deleteAllCookies(userCookie)
    location.href = "/"
}