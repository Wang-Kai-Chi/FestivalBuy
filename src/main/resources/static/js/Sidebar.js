fetch("./sidebar")
.then(response => response.text())
.then(data=>document.querySelector("#f-sidebar").innerHTML = data)