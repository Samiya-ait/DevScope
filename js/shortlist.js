import { getCandidats } from "./api.js";

const container = document.querySelector(".container")
let compteur = document.querySelector(".compteur")

async function displayCandidat() {
   const candidats= await getCandidats()
   candidats.forEach(elt => {
    const dateAj = new Date(elt.createdAt).toLocaleDateString("fr-FR", { day:"2-digit" ,month: "2-digit", year: "2-digit" })
     container.innerHTML +=`
     <div class="p-2 rounded-lg flex items-center gap-5 border-2 border-slate-900">
        <img
          src=${elt.avatar_url}
          width="50px"
          height="50px"
          alt="p"
          class="rounded-full border border-slate-900"
        />
            <div>
                <h5 class="font-bold text-sm text-white">${elt.name || elt.login} </h5>
                <p class="text-sm text-white">@${elt.login}</p>
                <p class="text-xs">${elt.note}</p>
                <p class="text-xs text-slate-800 bg-white rounded-lg p-1 font-bold">Ajouté le ${dateAj}</p>
            </div>
      </div>`
   });
   
    compteur.textContent = `${candidats.length} candidat(s) dans shortList`
    
}


displayCandidat()
