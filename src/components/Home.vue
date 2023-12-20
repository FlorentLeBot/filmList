<template>
    <div>
      <!-- On affiche le titre "Bienvenue sur la Page d'Accueil" -->
      <h1>Bienvenue sur la Page d'Accueil</h1>
      <!-- On intègre le composant FilmList pour afficher la liste de films -->
      <film-list></film-list>
    </div>
  </template>
  
  <script>
  import FilmList from './FilmList.vue'; // Assurez-vous que le chemin est correct
  
  export default {
    components: {
      FilmList
    },
    // Vous pouvez ajouter ici d'autres logiques ou données si nécessaire
  };
  </script>
  
  <style>
  /* Votre style CSS ici */
  </style>
  