import { getUser, getUserRepos } from "./api.js";


const params = new URLSearchParams(window.location.search)
const username = params.get("username")



const profile = document.querySelector("#aside")
const repositories = document.querySelector("#section")
const total = document.querySelector("#total-repos")

export async function displayProfile() {

  const user = await getUser(username)
  const dateAcc = new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })


  profile.innerHTML =`<div class="">
            <img
          src="${user.avatar_url}"
          width="100px"
          height="100px"
          alt="profil"
          class="rounded-full border border-red-600"
        />
        <div>
          <h2>${user.name || user.login}  </h2>
          <h5>@${user.login}</h5>
        </div>
        <p>${user.bio || "Aucune bio renseignée"}  </p>
        </div>
        
        <div class="bg-slate-300 my-2">
          <p>📍${user.location || "Localisation non renseignée"}</p>
          <p>📆 ${dateAcc}</p>
        </div>
        <div class="flex gap-5">
          <div class="bg-slate-300">${user.public_repos}</div>
          <div class="bg-slate-300">${user.followers}</div>
          <div class="bg-slate-300">${user.following}</div>
        </div>
        <button class="bg-slate-300 my-2">ajouter à la shortList</button>
        <button class="bg-slate-300">voir le profil original</button>`

  total.textContent = user.public_repos
}

displayProfile();


export async function displayRepo() {

  const userRepo = await getUserRepos(username)
  repositories.innerHTML = ""

  userRepo.forEach(repo => {

    const diffMs = (new Date() - new Date(repo.updated_at).getTime())
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    let updated_at;
    if(diffDays===0){
      updated_at="Mis à jour aujourd'hui"
    }else{
      updated_at=`Mis à jour il y a ${diffDays} jours`
    }

  


    repositories.innerHTML += ` 
        <article class= gap-10"grid grid-cols-2 grid-rows-3">
          <div class="bg-slate-300">
            <h5 class="font-bold">${repo.name}</h5>
            <p class="text-xs">${repo.description || "Pas de description"}</p>
            <ul class="text-xs flex gap-3">
              <li class="font-bold">${repo.language}</li>
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
