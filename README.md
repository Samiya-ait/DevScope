# DevScope – V2

DevScope est une application web de recrutement tech qui permet aux recruteurs de rechercher des développeurs sur GitHub, de consulter leurs profils et leurs dépôts publics, et de gérer une shortlist de candidats.

La version 2 apporte plusieurs améliorations : une gestion avancée des candidats, des fonctionnalités de recherche et de filtrage des dépôts, ainsi qu'un système de cache pour optimiser les performances de l'application.

## Technologies utilisées

- **HTML5**
- **Tailwind CSS**
- **JavaScript (DOM)**
- **GitHub REST API**
- **MockAPI**
- **JavaScript Modules (import/export)**

## Structure du projet

```text
DevScope/
│
├── js/
│   ├── api.js
│   ├── cache.js
│   ├── config.js
│   ├── recherche.js
│   ├── validation.js
│   ├── profile.js
│   └── shortlist.js
│
├── index.html
├── profile.html
├── shortlist.html
└── README.md
```

## Fonctionnalités implémentées

### 1. Recherche de développeurs

- Rechercher un développeur à partir de son nom d'utilisateur GitHub.
- Effectuer une recherche depuis la page d'accueil ou la page Profil.
- Vérifier la validité du nom d'utilisateur avant de lancer la recherche.
- Afficher des messages d'erreur en cas de saisie invalide.

### 2. Consultation des profils GitHub

- Afficher les informations du développeur : photo, nom, login, bio, localisation et date d'inscription.
- Afficher les statistiques : dépôts publics, abonnés et abonnements.
- Consulter la liste des dépôts sous forme de cartes avec leurs informations.
- Accéder au profil original du développeur sur GitHub.
- Rechercher un dépôt par son nom.
- Filtrer les dépôts par langage de programmation.
- Combiner la recherche par nom et le filtre par langage.
- Afficher un message lorsqu'aucun dépôt ne correspond aux critères de recherche.

### 3. Gestion avancée de la shortlist

- Ajouter un développeur à la shortlist.
- Empêcher l'ajout d'un même candidat plusieurs fois.
- Afficher la liste des candidats enregistrés et leur nombre total.
- Modifier le statut de recrutement d'un candidat.
- Attribuer une note de 1 à 5 à chaque candidat.
- Ajouter un commentaire personnalisé pour chaque candidat.
- Modifier ces informations depuis une fenêtre modale.
- Mettre à jour automatiquement la carte du candidat sans recharger la page.
- Supprimer un candidat après une confirmation.
- Actualiser automatiquement la liste et le compteur après une suppression.

### 4. Optimisation des performances – Système de cache

- Mettre en cache les profils GitHub consultés.
- Réutiliser les données d'un profil consulté au cours des 10 dernières minutes.
- Éviter les requêtes répétées vers l'API GitHub lorsque les données sont encore en cache.
- Réduire les requêtes inutiles et améliorer la rapidité d'affichage des profils.

## Organisation et gestion du projet

- Organisation du code en modules JavaScript avec `import` et `export`.
- Séparation des responsabilités : API, configuration, validation, cache, recherche, profil et shortlist.
- Utilisation de Git et GitHub pour le versionnement du projet.
- Création d'un tag Git pour identifier la version 1.
- Planification des améliorations de la version 2 à travers une Epic Jira.