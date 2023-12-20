<template>
    <div>
      <!-- On affiche le titre "Connexion" -->
      <h2>Connexion</h2>
      <!-- On crée un formulaire qui appelle la fonction "login" lors de la soumission -->
      <form @submit.prevent="login">
        <!-- On crée un champ de saisie pour l'email avec liaison à la variable "email" -->
        <input type="email" v-model="email" placeholder="Email" required />
        <!-- On crée un champ de saisie pour le mot de passe avec liaison à la variable "password" -->
        <input type="password" v-model="password" placeholder="Mot de passe" required />
        <!-- On crée un bouton pour soumettre le formulaire -->
        <button type="submit">Se connecter</button>
        <!-- On affiche un message d'erreur s'il y a une erreur de connexion -->
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Assurez-vous que le chemin est correct

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    // On définit la fonction "login" pour gérer le processus de connexion
    const login = async () => {
      // On réinitialise le message d'erreur
      errorMessage.value = '';
      try {
        // On appelle la fonction "signInWithEmailAndPassword" pour se connecter avec l'email et le mot de passe
        await signInWithEmailAndPassword(auth, email.value, password.value);
        // On redirige vers la page d'accueil en cas de succès de la connexion
        this.$router.push('/');
      } catch (error) {
        // On affiche les erreurs ici en cas d'échec de la connexion
        errorMessage.value = error.message;
      }
    };

    return { email, password, login, errorMessage };
  }
};
</script>
