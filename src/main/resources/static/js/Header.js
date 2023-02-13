import * as cookieParser from "./util/CookieParser.js"

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
        })
}

function checkLoginState(){
    const userCookie = document.cookie

    if (userCookie != "") {
        const cookie = cookieParser.parseCookie(userCookie)
        console.log(cookie)

        if (cookie.customer_id != null) {
            document.querySelector("#header-user-action").innerHTML =
            `<button type="button" id="logout-btn" class="btn btn-danger" onclick="">登出</button>`
            console.log(document.querySelector("#header-user-action").innerHTML)
            
            document.querySelector("#logout-btn").onclick = ()=>{
                cookieParser.deleteAllCookies(userCookie)
                location.href = "/"
            }
        }
    }
}