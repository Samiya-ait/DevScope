import { getCandidats, getUser, getUserRepos } from "./api.js";
import { getUserCache, setUserCache } from "./cache.js";
import { api } from "./config.js";
import { validation } from './validation.js'


const params = new URLSearchParams(window.location.search)
const username = params.get("username")


const main=document.querySelector(".main")
const profile = document.querySelector("#aside")
const repositories = document.querySelector("#section")
const total = document.querySelector("#total-repos")

// const user = await getUser(username)
const key = username.toLowerCase()
let data=getUserCache(key)
if(!data){
      try{
const[user,repos]=await Promise.all([getUser(key),getUserRepos(key)])
       data={ user, repos }
       setUserCache(key, data)
      }catch(error){
        main.innerHTML = `<p class="text-white">Utilisateur introuvable</p>`
        throw new Error("Utilisateur introuvable")
      }
        
    }
const user = data.user
const userRepo = data.repos

export function displayProfile() {

  const dateAcc = new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })


  profile.innerHTML =`
  <div class ="text-white text-center  ">
            <img
          src="${user.avatar_url}"
          width="100px"
          height="100px"
          alt="profil"
          class="rounded-full border-2 border-white"
        />
        <div class="">
          <h2>${user.name || user.login}  </h2>
          <h5 class="text-pink-600">@${user.login}</h5>
        </div>
        <p>${user.bio || "Aucune bio renseignée"}  </p>
        </div>
        
        <div class="bg-white  my-2 font-bold rounded-xl">
          <p>📍${user.location || "Localisation non renseignée"}</p>
          <p>📆 ${dateAcc}</p>
        </div>
        <div class="flex gap-5 m-2 ">
          <div class="bg-pink-600 text-white rounded-full p-1 text-center text-xs">${user.public_repos}<p class="text-xs">Dépots</p></div>
          <div class="bg-pink-600 text-white rounded-full p-1 text-center text-xs">${user.followers}<p class="text-xs">Abonnées</p></div>
          <div class="bg-pink-600 text-white rounded-full p-1 text-center text-xs">${user.following}<p class="text-xs">Abonnements</p></div>
        </div>
        <button id="btn-ajouter" class=" bg-slate-300 m-2 px-3 rounded-xs text-black font-bold">ajouter à la shortList</button>
        <p class="mssg text-xs text-red-600"></p>
        <button id="btn-profile" class="bg-slate-300 m-2 px-3 rounded-xs text-black font-bold">voir le profil original</button>
        
        `

  total.textContent = user.public_repos
 
}
// const userRepo = await getUserRepos(username)
displayProfile();


export async function displayRepo() {

  repositories.innerHTML = ""

  userRepo.forEach(repo => {

    const diffMs = (new Date() - new Date(repo.updated_at).getTime())
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let updated_at;
    if (diffDays === 0) {
      updated_at = "Mis à jour aujourd'hui"
    } else {
      updated_at = `Mis à jour il y a ${diffDays} jours`
    }

    repositories.innerHTML += ` 
        <article class=repo gap-10"grid grid-cols-2 grid-rows-3">
          <div class="bg-white rounded-lg p-1">
            <h5 class="nameTitle font-bold text-pink-800">${repo.name}</h5>
            <p class="text-xs">${repo.description || "Pas de description"}</p>
            <ul class="text-xs flex gap-3">
              <li class="lang font-bold">${repo.language}</li>
              <li><i class="fa-solid fa-star fa-sm" style="color: rgb(255, 212, 59);"></i>${repo.stargazers_count}</li>
              <li><i class="fa-solid fa-code-fork"></i>${repo.forks_count}</li>
            </ul>
            <p class="text-xs">${updated_at}</p>
          </div>
          
        </article>
      
    `
  })


}

displayRepo()


const ajouter = document.querySelector("#btn-ajouter")

const mssg = document.querySelector(".mssg")

ajouter.addEventListener("click", async (e) => {

  const candidat = {
    id: user.id,
    login: user.login,
    name: user.name,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
    language: "HTML",
    rating: 5,
    status: "refusé",
    note: "",
    createdAt: new Date().toISOString()
  }

  const results = await fetch(api)
  const candidats = await results.json()
  const exist = candidats.some(elt => elt.login === candidat.login)
  if (exist) {
    mssg.textContent = "ce candidat est déja exist"
    return
  }
  const post_data = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidat)
  });

})

const profil = document.querySelector("#btn-profile")
profil.addEventListener("click", e => {
  window.open(user.html_url, "_blank");
})

// const form = document.querySelector("#form")

// form.addEventListener("submit", async (event) => {
//   event.preventDefault()
//   let name = validation(input)
//   let user = await getUser(name)

//   window.location.href = `/profile.html?username=${encodeURIComponent(user.login)}`
// })








const input = document.querySelector("#input")

let repos = document.querySelectorAll(".repo")
// 
input.addEventListener("input", () => {

  let depotInput = input.value.toLowerCase().trim()
  repos.forEach(p => {
    let name = p.querySelector(".nameTitle").textContent.toLowerCase().trim()

    if (name.includes(depotInput)) {
      p.style.display = "block"
    }
    else {
      p.style.display = "none"

    }
  })
})

const filtres = document.querySelectorAll(".filtre")



filtres.forEach(btn => {
  btn.addEventListener("click", (e) => {
    let filter = e.target.dataset.cat

    if (filter === "tous") {
      console.log(userRepo)
    }
    else {
      console.log("filter:", filter.toLowerCase())

      repos.forEach(p => {
        let lang = p.querySelector(".lang").textContent.toLowerCase().trim()
        // console.log("lang:",lang)
        if (lang === filter.toLowerCase()) {
          p.style.display = "block"
        }
        else {
          p.style.display = "none"
        }

      })
    }
  })
})

//my method of search and filter

// let depotInput = ""
// let filter = "tous"

// const input = document.querySelector("#input")
// const filtres = document.querySelectorAll(".filtre")



// filtres.forEach(btn => {
//   btn.addEventListener("click", (e) => {
//      filter = e.target.dataset.cat

//   })
// })
//     input.addEventListener("input", () => {

//        depotInput = input.value.toLowerCase().trim() })

  
//   let searched=userRepo.filter(elt=>elt.name.includes(depotInput))
//   if(filter==="tous"){
//     return searched;
//   }else{
//     return searched.filter(elt=>{elt.language.toLowerCase()===filter.toLowerCase()})
//   }



