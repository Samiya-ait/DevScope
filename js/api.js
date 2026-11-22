import { api } from "./config.js";


export async function getUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json"
                }
            })

        if (response.status === 404) {
            throw new Error("Aucun développeur trouvé");
        }
        if (response.status === 403 || response.status === 429) {
            throw new Error("Limite de requêtes atteinte. Réessayez plus tard.");
        }
        if (!response.ok) {
            throw new Error("Erreur du serveur : " + response.status);
        }

        let data = await response.json();
        console.table(data)
        return data;



    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function getUserRepos(username) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=12&sort=updated`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json"
                }
            })

        if (!response.ok) {
            throw new Error("Impossible de récupérer les repositories");
        }

        let data = await response.json();
        console.table(data)
        return data;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export async function getCandidats() {
    try {
        const response = await fetch(api,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json"
                }
            })
        if (!response.ok) {
            throw new Error("impossible de récuperer les candidats")
        }
        return await response.json()
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}

export async function updateCandidate(id, candidat) {
    const reponse = await fetch(`${api}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidat),
    });
    if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
    return reponse.json();
}

export async function  deleteCandidat(id){
    const reponse = await fetch(`${api}/${id}`
            , { method: "DELETE" });
        if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
}