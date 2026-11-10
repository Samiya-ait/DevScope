import {validation} from './validation'



const form=document.querySelector("#form")
const button=document.querySelector("#btn")
const input=document.querySelector("#input")


form.addEventListener("submit",event=>{
    event.preventDefault()
    validation();
    window.location.href=`profile.html`
})

