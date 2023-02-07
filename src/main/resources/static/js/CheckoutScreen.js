
main()

function main(){
    const form = document.querySelector("form")
    
    console.log(form)
    
    form.addEventListener("submit", handleSubmit)
}

function handleSubmit(event){
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get("usermail")
    const obj = Object.fromEntries(formData.entries())
    
    console.log(obj)
}