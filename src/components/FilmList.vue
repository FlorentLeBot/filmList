<template>
    <div class="film-list">
      <!-- On affiche le titre "Liste de Films" -->
      <h2>Liste de Films</h2>
      <!-- Formulaire pour ajouter ou mettre à jour un film -->
      <form @submit.prevent="addOrUpdateFilm">
        <!-- Champ de saisie pour le titre du film -->
        <input type="text" v-model="newFilmTitle" placeholder="Titre du film" />
        <!-- Champ de saisie pour la description du film -->
        <textarea v-model="newFilmDescription" placeholder="Description"></textarea>
        <!-- Bouton pour ajouter ou mettre à jour le film en fonction de l'état de editingFilm -->
        <button type="submit">{{ editingFilm ? 'Mettre à jour' : 'Ajouter' }}</button>
      </form>
  
      <!-- Liste de films -->
      <ul>
        <!-- Boucle pour afficher chaque film -->
        <li v-for="film in films" :key="film.id">
          <!-- Affichage du titre et de la description du film -->
          <strong>{{ film.title }}</strong> - {{ film.description }}
          <!-- Bouton pour éditer le film -->
          <button @click="editFilm(film)">Modifier</button>
          <!-- Bouton pour supprimer le film -->
          <button @click="deleteFilm(film.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db } from '../firebaseConfig';
  import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
  
  export default {
    setup() {
      const films = ref([]);
      const newFilmTitle = ref('');
      const newFilmDescription = ref('');
      const editingFilm = ref(null);
  
      const filmsCollectionRef = collection(db, 'films');
  
      const loadFilms = async () => {
        // Chargement des films depuis Firestore
        const data = await getDocs(filmsCollectionRef);
        films.value = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      };
  
      const addOrUpdateFilm = async () => {
        if (!newFilmTitle.value.trim() || !newFilmDescription.value.trim()) return;
        
        const filmData = { title: newFilmTitle.value, description: newFilmDescription.value };
  
        if (editingFilm.value) {
          // Mise à jour du film existant
          await updateDoc(doc(db, 'films', editingFilm.value.id), filmData);
        } else {
          // Ajout d'un nouveau film
          await addDoc(filmsCollectionRef, filmData);
        }
  
        // Réinitialisation des champs
        newFilmTitle.value = '';
        newFilmDescription.value = '';
        editingFilm.value = null;
        loadFilms(); // Rechargement de la liste de films
      };
  
      const editFilm = (film) => {
        // Remplissage des champs de saisie avec les données du film à éditer
        newFilmTitle.value = film.title;
        newFilmDescription.value = film.description;
        editingFilm.value = film;
      };
  
      const deleteFilm = async (id) => {
        // Suppression du film par ID
        await deleteDoc(doc(db, 'films', id));
        loadFilms(); // Rechargement de la liste de films
      };
  
      onMounted(loadFilms); // Chargement initial des films
  
      return { films, newFilmTitle, newFilmDescription, addOrUpdateFilm, editFilm, deleteFilm, editingFilm };
    }
  };
  </script>
  
  <style>
  /* Stylisation du formulaire dans FilmList */
  .film-list form {
    margin-bottom: 20px;
  }
  
  .film-list input[type="text"],
  .film-list textarea {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .film-list button {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 10px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .film-list button:hover {
    background-color: #45a049;
  }
  
  /* Stylisation de la liste de films */
  .film-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .film-list li {
    margin: 10px 0;
    padding: 10px;
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .film-list li button {
    background-color: #f44336;
    margin-left: 10px;
  }
  
  .film-list li button:hover {
    background-color: #d32f2f;
  }
  </style>
  