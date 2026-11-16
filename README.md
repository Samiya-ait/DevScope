# DevScope
 une application web de recrutement tech qui permet aux recruteurs de rechercher des développeurs sur GitHub, de consulter leurs profils et leurs dépôts publics, et de gérer une shortlist de candidats. 


## Technologies Utilisées
* **HTML5**  
* **Tailwind CSS** 
* **JavaScript (DOM)** 
* **GitHub REST API**  
* **MockAPI**  
* **JavaScript Modules**  


## Structure du projet

```text
DevScope/
│
├── js/
│   ├── api.js
│   ├── config.js
    ├── recherche.js
    ├── validation.js
    ├── profile.js
│   └── shortlist.js
│
├── index.html
├── profile.html
├── shortlist.html
└── README.md
```

## Fonctionnalités Implémentées

### 1. Recherche de développeurs
* Rechercher un développeur à partir de son nom d'utilisateur GitHub.
* Effectuer une recherche depuis la page d'accueil ou la page Profil.
* Vérifier la validité du nom d'utilisateur avant de lancer la recherche.
* Afficher des messages d'erreur en cas de saisie invalide.

### 2. Consultation des profils GitHub
* Afficher les informations du développeur : photo, nom, login, bio, localisation et date d'inscription.
* Afficher les statistiques : dépôts publics, abonnés et abonnements.
* Consulter la liste des dépôts sous forme de cartes avec leurs informations.
* Accéder au profil original du développeur sur GitHub.

### 3. Gestion de la shortlist
* Ajouter un développeur à la shortlist.
* Empêcher l'ajout d'un même candidat plusieurs fois.
* Afficher la liste des candidats enregistrés et leur nombre total.
