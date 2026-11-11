

const username = new URLSearchParams(window.location.search)
export const user = username.get("username")
// console.log(user)


// const repoNbr=user.public_repos;
// console.log(user)
const profile = document.querySelector("#aside")
const repository = document.querySelector("#section")

export function displayProfile(user) {
    profile.innerHTML =`        <div class="">
            <img
          src="${user.avatar_url}"
          width="100px"
          height="100px"
          alt="profil"
          class="rounded-full border border-red-600"
        />
        <div>
          <h2>${user.name}</h2>
          <h5>${user.login}</h5>
        </div>
        <p>${user.bio}</p>
        </div>
        
        <div class="bg-slate-300 my-2">
          <p>📍${user.location}</p>
          <p>📆 ${user.created_at}</p>
        </div>
        <div class="flex gap-5">
          <div class="bg-slate-300">${user.public_repos}</div>
          <div class="bg-slate-300">${user.followers}</div>
          <div class="bg-slate-300">${user.following}</div>
        </div>
        <button class="bg-slate-300 my-2">ajouter à la shortList</button>
        <button class="bg-slate-300">voir le profil original</button>`
}

export function displayRepo(repos) {

    repository.innerHTML=""

    repos.forEach(repo=>{
       repository.innerHTML =`
            <div class="flex gap-2 items-center my-2">
          <h1 class="text-xl ">Dépots</h1>
          <p class="bg-blue-300 text-xs ">${user.public_repos }</p>
        </div>

        <article class="grid grid-cols-2 grid-rows-3 gap-10">
          <div class="bg-slate-300">
            <h5 class="font-bold">${repo.name}</h5>
            <p class="text-xs">${repo.description}</p>
            <ul class="text-xs flex gap-3">
              <li class="font-bold">${repo.language}</li>
              <li>${repo.stargazers_count}</li>
              <li>${repo.forks_count}</li>
            </ul>
            <p class="text-xs">${repo.updated_at}</p>
          </div>
          
        </article>
    `
    })

   
}