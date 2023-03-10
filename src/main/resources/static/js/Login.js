import * as cok from "./util/CookieLoader.js"

const postBody = {
    "email": "museum@gmail.com",
    "password": "P@ssw0rd"
}

main()

function main() {
    cok.redirectIfAlreadyLogin()

    const form = document.querySelector("form")
    form.addEventListener("submit", handleSubmit)
}

function handleSubmit(event) {
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const obj = Object.fromEntries(formData.entries())

    console.log(obj)
    setBody(obj)

    postData()
}

function setBody(obj) {
    postBody.email = obj.cemail
    postBody.password = obj.cpassword
}

const postData = async function () {
    fetch("/api/customers/check", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Keep-Alive': 'timeout=2000'
        },
        body: JSON.stringify(postBody)
    })
        .then(response => response.json())
        .then(jsonData => {
            saveCookie(jsonData)
            location.href = "/"
        })
        .catch(err => {
            alert("登入失敗，請重新確認電子郵件和密碼")
            location.reload()
        })
}

function saveCookie(jsonData = {}) {
    const keys = Object.keys(jsonData)
    const values = []

    for (const k of keys)
        values.push(jsonData[k])

    for (const i in keys)
        document.cookie = keys[i] + "=" + values[i] + ";"

    console.log(document.cookie)
}