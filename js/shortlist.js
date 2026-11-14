import { getCandidats } from "./api.js";

const card = document.querySelector(".Card")
let compteur = document.querySelector(".compteur")

async function displayCandidat() {
   const candidats= await getCandidats()
   candidats.forEach(elt => {
     card.innerHTML +=`<img
          src=${elt.avatar_url}
          width="30px"
          height="30px"
          alt="p"
          class="rounded-full border border-red-600"
        />
            <div>
                <h5 class="font-bold text-xs">${elt.name || elt.login} </h5>
                <p class="text-xs">@${elt.login}</p>
                <p class="text-xs">${elt.note}</p>
                <p class="text-xs">${elt.createdAt}</p>
            </div>`
   });
   
    compteur.textContent = `${candidats.length} candidat(s) dans shortList`
    
}


displayCandidat()
