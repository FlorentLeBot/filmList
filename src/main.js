// On importe les dépendances nécessaires
import { createApp } from 'vue';
import App from './App.vue'; // Composant principal de l'application
import router from './router'; // Configuration du routeur de l'application
import { auth } from './firebaseConfig'; // Objet d'authentification de Firebase (vérifiez ce chemin)

// On déclare une variable pour stocker l'instance de l'application
let app;

// On écoute les changements d'état d'authentification de l'utilisateur
auth.onAuthStateChanged(() => {
  // On vérifie si l'application n'a pas encore été créée
  if (!app) {
    // On crée une instance d'application Vue.js
    app = createApp(App)
      // On utilise le routeur défini pour l'application
      .use(router)
      // On monte l'application sur l'élément HTML avec l'ID "app"
      .mount('#app');
  }
});
