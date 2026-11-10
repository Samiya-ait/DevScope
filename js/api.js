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
            return await response.json();
        
    } catch (error) {
        console.error(error.message);
    }
}