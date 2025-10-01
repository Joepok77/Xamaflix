# Xamaflix - Version React

🎬 Application de streaming de films construite avec React, Vite et l'API TMDB.

## 🚀 Installation et lancement

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du projet

```
react-app/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Navbar.jsx       # Barre de navigation
│   │   ├── MovieCard.jsx    # Carte de film
│   │   ├── MovieList.jsx    # Liste de films
│   │   └── SearchBar.jsx    # Barre de recherche
│   ├── pages/               # Pages principales
│   │   ├── Home.jsx         # Page d'accueil
│   │   └── MovieDetails.jsx # Page de détails d'un film
│   ├── services/            # Appels API
│   │   └── tmdbApi.js       # Service API TMDB
│   ├── App.jsx              # Composant racine avec Router
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux
```

## ✨ Fonctionnalités

- ✅ Affichage des films populaires depuis l'API TMDB
- ✅ Recherche de films en temps réel avec debounce
- ✅ Filtrage par genres
- ✅ Page de détails avec casting et synopsis
- ✅ Navigation fluide avec React Router
- ✅ Design sombre type Netflix
- ✅ Système de likes sur les cartes de films
- ✅ Responsive design

## 🎯 Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **React Router 6** - Navigation
- **Bootstrap 5** - Framework CSS
- **TMDB API** - Base de données de films

## 📝 Routes disponibles

- / - Page d'accueil (films populaires)
- /films - Page films (même que l'accueil)
- /movie/:id - Détails d'un film
- /series - Page séries (à venir)
- /ma-liste - Ma liste personnalisée (à venir)
