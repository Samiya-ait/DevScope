import { getUser } from './api.js';
import {validation} from './validation.js'



const form=document.querySelector("#form")
const input=document.querySelector("#input")




form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    let name=validation(input)
    let user=await getUser(name)
    
    window.location.href=`/profile.html?username=${encodeURIComponent(user.login)}`
})

