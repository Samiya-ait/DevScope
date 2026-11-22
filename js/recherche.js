import { getUser, getUserRepos } from './api.js';
import { getUserCache, setUserCache } from './cache.js';
import {validation} from './validation.js'

const form=document.querySelector("#form")
const input=document.querySelector("#input")

form.addEventListener("submit",async(event)=>{
    event.preventDefault()
    let name=validation(input)
  
    if (!name)return

    // let user=await getUser(name)
    const key = name.toLowerCase()
    let data= getUserCache(key)

    if(!data){
      try{
         const[user,repos]=await Promise.all([getUser(key),getUserRepos(key)])
       data={ user, repos }
       setUserCache(key, data)
      }catch(error){
        alert("Utilisateur introuvable")
        throw new Error("Utilisateur introuvable")
        
      }

       
    }
    window.location.href=`/profile.html?username=${encodeURIComponent(key)}`
})

