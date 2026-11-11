import {displayProfile,displayRepo,user} from './profile.js'


export async function getUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)

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
        console.log(data)
        displayProfile(data);
        

    } catch (error) {
        console.error(error.message);
    }
}
getUser(user)


export async function getUserRepos(username) {
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=10&sort=updated`
        );

        if (!response.ok) {
            throw new Error("Impossible de récupérer les repositories");
        }

        let data = await response.json();
        console.log(data)
        displayRepo(data);

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

getUserRepos(user)