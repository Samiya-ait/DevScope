import { getCandidats, updateCandidate } from "./api.js";

const container = document.querySelector(".container")
let compteur = document.querySelector(".compteur")


let candidats = await getCandidats()
function displayCandidat() {
    container.innerHTML = ""

    candidats.forEach(elt => {
        const dateAj = new Date(elt.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" })
        container.innerHTML +=`
     <div id=${elt.id} class="carte flex border-2 border-slate-900 justify-between">
     <div class="p-2 rounded-lg flex items-center gap-5 ">
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
                <p class="text-xs text-white">${elt.language}</p>
                <p class="text-xs text-slate-800 bg-white rounded-lg p-1 font-bold">Ajouté le ${dateAj}</p>
            </div>
      </div>
        <div class="text-white  gap-5  flex-col text-xs">
        <p class="star ">${"⭐".repeat(elt.rating || 0)}<p>
        <p class="status">${elt.status}<p>
        <button data-action="modifier" class="cursor-pointer">modifier</button>
        <button data-action="supprimer" class="cursor-pointer">supprimer</button>
        </div>
      </div>`
    });

    compteur.textContent = `${candidats.length} candidat(s) dans shortList`

}


displayCandidat()

const note = document.querySelector("#note")
const status = document.querySelector("#status")
const rating = document.querySelector("#rating")
const form = document.querySelector("form")
const save = document.querySelector("#save")

const updateModal = document.querySelector("#updateD")
const deleteModal = document.querySelector("#deleteD")
// const cancelUp=document.querySelectorAll("#cancelUp")
// const cancelDlt=document.querySelectorAll("#cancelDlt")

const deleteB = document.querySelector("#delete")


let idUpdate = null

container.addEventListener("click", (e) => {
    // modifier modal
    const click = e.target.closest("[data-action]")
    if (click.dataset.action === "modifier") {
        const id = click.closest(".carte").id


        const c = candidats.find(elt => elt.id === id)
        note.value = c.note
        status.value = c.status
        rating.value = c.rating

        idUpdate = id
        updateModal.showModal();
    }
    // delete model
    if (click.dataset.action === "supprimer") {
        deleteModal.showModal();
    }

});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (idUpdate !== null) {
        const c = candidats.find(elt => elt.id === idUpdate)
        c.note = note.value
        c.status = status.value
        c.rating = rating.value

        save.disabled = true
        save.textContent = "en cours"

        try {
            await updateCandidate(idUpdate, c)
            displayCandidat()
            idUpdate = null
            form.reset()
            updateModal.close()
        } catch (error) {
            console.log(error)
        } finally {
            save.disabled = false
            save.textContent = "Enregistrer"
        }
    }

})

updateModal.addEventListener("click", (e) => {
    const click = e.target.closest(".cancelUp")
    if (click) {
        updateModal.close()
    }

})

deleteModal.addEventListener("click", (e) => {
    const click = e.target.closest(".cancelDlt")
    if (click) {
        deleteModal.close()
    }
})