fetch("./header")
.then(response => response.text())
.then(data=>document.querySelector("header").innerHTML = data)