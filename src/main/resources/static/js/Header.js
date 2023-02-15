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
            document.querySelector("#header-user-action").innerHTML = userMugShot(cookie.full_name)

            console.log(document.querySelector("#header-user-action").innerHTML)

            document.querySelector("#logout-btn").onclick = () => handleLogout(userCookie)
        }
    }
}

const userMugShot = (name) => {
    return `<span class="text-light me-2">你好!${name}</span>
    <button type="button" id="logout-btn" class="btn btn-danger" onclick="">登出</button>`
}

function handleLogout(userCookie) {
    localStorage.clear()
    cookieParser.deleteAllCookies(userCookie)
    location.href = "/"
}