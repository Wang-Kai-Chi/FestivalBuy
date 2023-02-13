import * as cookieParser from "./CookieParser.js"

export const cookie = () => {
    return cookieParser.parseCookie(document.cookie)
}
export function isLogin() {
    if (cookie.customer_id == null) {
        if (!alert("請先登入"))
            location.href = "/login"
    } else
        return true
}

export function redirectIfAlreadyLogin() {
    if (document.cookie != "") {
        if (cookie().customer_id != null) {
            location.href = "/"
        }
    }
}

export const current_product = () => {
    return cookie().current_product
}