import {validation} from './validation.js'



const form=document.querySelector("#form")
const button=document.querySelector("#btn")
const input=document.querySelector("#input")




form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let name=validation(input)

console.log(name)
    window.location.href=`/profile.html?username=${encodeURIComponent(name)}`
})

