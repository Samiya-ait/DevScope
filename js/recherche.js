import {validation} from './validation.js'
import{getUser} from './api.js'


const form=document.querySelector("#form")
const button=document.querySelector("#btn")
const input=document.querySelector("#input")


form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    let name=validation(input)
    let user= await getUser(name)
    console.log(user)

    // window.location.href=`profile.html`
    



})