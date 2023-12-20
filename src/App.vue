<template>
  <div id="app">
    <nav>
      <ul>
        <!-- On affiche le lien "Home" si l'utilisateur est authentifié -->
        <li v-if="isAuthenticated"><router-link to="/">Home</router-link></li>
        <!-- On affiche le lien "SignUp" si l'utilisateur n'est pas authentifié -->
        <li v-if="!isAuthenticated"><router-link to="/signup">SignUp</router-link></li>
        <!-- On affiche le lien "Login" si l'utilisateur n'est pas authentifié -->
        <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
        <!-- On affiche le bouton de déconnexion si l'utilisateur est authentifié -->
        <li v-if="isAuthenticated"><button @click="logout" class="logout-button">Logout</button></li>
      </ul>
    </nav>
    <!-- On affiche la vue principale de l'application -->
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from './firebaseConfig'; // Assurez-vous que le chemin d'importation est correct
import { useRouter } from 'vue-router';

export default {
  setup() {
    const isAuthenticated = ref(false);
    const router = useRouter();

    onMounted(() => {
      // On vérifie l'état d'authentification de l'utilisateur lors du chargement de la page
      auth.onAuthStateChanged((user) => {
        // On met à jour l'état d'authentification en fonction de la présence de l'utilisateur
        isAuthenticated.value = !!user;
        // Si l'utilisateur est authentifié, on le redirige vers la page "Home". Sinon, on le laisse sur la page actuelle.
        if (user) {
          router.push('/');
        }
      });
    });

    const logout = async () => {
      try {
        // On déconnecte l'utilisateur
        await auth.signOut();
        // On redirige l'utilisateur vers la page de connexion après la déconnexion
        router.push('/login');
      } catch (error) {
        console.error("Erreur lors de la déconnexion : ", error);
      }
    };

    return {
      isAuthenticated,
      logout
    };
  }
};
</script>

<style>
/* Styles globaux pour l'application */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 10px;
}

nav ul li a {
  text-decoration: none;
  color: #42b983;
}

/* Styles spécifiques au bouton de déconnexion */
.logout-button {
    background-color: #f44336; /* Rouge */
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.logout-button:hover {
    background-color: #d32f2f; /* Rouge foncé */
}
</style>
